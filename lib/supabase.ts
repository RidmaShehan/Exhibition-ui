import { createClient } from '@supabase/supabase-js';
import { VisitorFormData, Program, VisitorMetadata } from '@/types';

interface DatabaseProgram {
  id: number;
  name?: string;
  program_name?: string;
  category_code?: string;
  category?: string;
  is_active?: boolean;
}

interface DatabaseVisitor {
  id: string;
  name: string;
  work_phone: string;
  district?: string;
  is_converted?: boolean;
  converted_at?: string | null;
}

// Production environment variables (set in Vercel Dashboard)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate production environment variables
if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
      '❌ Production Error: Missing Supabase environment variables!\n' +
      'Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel Dashboard → Settings → Environment Variables'
    );
  }
}

// Create Supabase client (works in both development and production)
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

const DEFAULT_PROGRAMS: Program[] = [
  { id: 1, program_name: 'Diploma in Business Management', category: 'Undergraduate', is_active: true },
  { id: 2, program_name: 'Advanced Diploma in Business Management', category: 'Undergraduate', is_active: true },
  { id: 3, program_name: 'Certificate in Sales & Marketing', category: 'Undergraduate', is_active: true },
  { id: 4, program_name: 'Diploma in Sales & Marketing', category: 'Undergraduate', is_active: true },
  { id: 5, program_name: 'Certificate in Human Resource', category: 'Undergraduate', is_active: true },
  { id: 6, program_name: 'Diploma in Human Resource', category: 'Undergraduate', is_active: true },
  { id: 7, program_name: 'Diploma in Professional English & Digital Skills', category: 'Diploma certificate', is_active: true },
  { id: 8, program_name: 'Advanced Certificate in Professional English', category: 'Diploma certificate', is_active: true }
];

/**
 * Fetch all active programs
 */
export const fetchPrograms = async (): Promise<Program[]> => {
  if (!supabase) {
    return DEFAULT_PROGRAMS;
  }

  try {
    // Schema Option 1 (Database's actual schema: id, name, category_code)
    const { data, error } = await supabase
      .from('programs')
      .select('id, name, category_code')
      .order('category_code', { ascending: true })
      .order('name', { ascending: true });

    if (!error && data && data.length > 0) {
      return data.map((p: DatabaseProgram) => ({
        id: p.id,
        program_name: p.name || '',
        category: p.category_code 
          ? (p.category_code.charAt(0).toUpperCase() + p.category_code.slice(1).replace('_', ' ')) 
          : 'General',
        is_active: true
      }));
    }

    if (error) {
      console.warn('Schema Option 1 query failed, trying Schema Option 2...', error.message);
    }

    // Schema Option 2 (Standard/alternative schema: id, program_name, category, is_active)
    const { data: dataAlt, error: errorAlt } = await supabase
      .from('programs')
      .select('id, program_name, category, is_active')
      .eq('is_active', true)
      .order('category', { ascending: true })
      .order('program_name', { ascending: true });

    if (!errorAlt && dataAlt && dataAlt.length > 0) {
      return dataAlt.map((p: DatabaseProgram) => ({
        id: p.id,
        program_name: p.program_name || '',
        category: p.category || 'General',
        is_active: p.is_active ?? true
      }));
    }

    if (errorAlt) {
      console.error('Schema Option 2 query failed:', errorAlt.message);
    }

    console.warn('Using DEFAULT_PROGRAMS as fallback because database query returned no programs or failed.');
    return DEFAULT_PROGRAMS;
  } catch (error) {
    console.error('Error fetching programs:', error);
    return DEFAULT_PROGRAMS;
  }
};

/**
 * Submit visitor registration with programs and metadata
 */
export const submitVisitorRegistration = async (
  formData: VisitorFormData,
  metadata: VisitorMetadata
): Promise<{ success: boolean; error?: string; visitorId?: string }> => {
  try {
    // If Supabase is not configured, simulate success (demo mode)
    if (!supabase) {
      console.log('Demo mode: Data would be saved:', {
        visitor: formData,
        metadata,
      });
      return { success: true, visitorId: 'demo-' + Date.now() };
    }

    let visitor: DatabaseVisitor | null = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let visitorError: any = null;

    // Try inserting with district column
    try {
      const { data, error } = await supabase
        .from('exhibition_visitors')
        .insert([
          {
            name: formData.name,
            work_phone: formData.workPhone,
            district: formData.district,
            is_converted: false,
            converted_at: null,
          },
        ])
        .select()
        .single();
      visitor = data;
      visitorError = error;
    } catch (e) {
      visitorError = e;
    }

    // If it fails because district column doesn't exist, retry without it
    if (
      visitorError && 
      (visitorError.message?.includes('column "district" does not exist') || 
       visitorError.message?.includes('column "district" of relation') ||
       visitorError.message?.includes("Could not find the 'district' column") ||
       visitorError.code === '42703' ||
       visitorError.code === 'PGRST204')
    ) {
      console.warn('⚠️ Warning: "district" column does not exist in exhibition_visitors table. Retrying insert without it. Please run migration-add-district.sql in your Supabase SQL Editor.');
      
      const { data, error } = await supabase
        .from('exhibition_visitors')
        .insert([
          {
            name: formData.name,
            work_phone: formData.workPhone,
            is_converted: false,
            converted_at: null,
          },
        ])
        .select()
        .single();
      visitor = data;
      visitorError = error;
    }

    if (visitorError) throw visitorError;
    if (!visitor) throw new Error('Failed to create visitor record');

    const visitorId = visitor.id;

    // Step 2: Insert visitor program (selected course) - NON-BLOCKING
    if (formData.selectedProgramId !== null && formData.selectedProgramId !== undefined) {
      try {
        const { error: programsError } = await supabase
          .from('visitor_programs')
          .insert([
            {
              visitor_id: visitorId,
              program_id: formData.selectedProgramId,
            },
          ]);

        if (programsError) {
          console.warn('⚠️ Warning: Failed to insert visitor program relation:', programsError.message);
        }
      } catch (err) {
        console.warn('⚠️ Warning: Failed to insert visitor program relation:', err);
      }
    }

    // Step 3: Insert visitor metadata - NON-BLOCKING
    try {
      const { error: metadataError } = await supabase
        .from('visitor_metadata')
        .insert([
          {
            visitor_id: visitorId,
            ip_address: metadata.ip_address,
            country: metadata.country,
            city: metadata.city,
            region: metadata.region,
            timezone: metadata.timezone,
            user_agent: metadata.user_agent,
            browser: metadata.browser,
            device: metadata.device,
            submission_date: metadata.submission_date,
            submission_time: metadata.submission_time,
          },
        ]);

      if (metadataError) {
        console.warn('⚠️ Warning: Failed to insert visitor metadata:', metadataError.message);
      }
    } catch (err) {
      console.warn('⚠️ Warning: Failed to insert visitor metadata:', err);
    }

    return { success: true, visitorId };
  } catch (error) {
    console.error('Supabase submission error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

/**
 * Mark visitor as converted
 */
export const markVisitorAsConverted = async (
  visitorId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    if (!supabase) {
      console.log('Demo mode: Would mark visitor as converted:', visitorId);
      return { success: true };
    }

    const { error } = await supabase
      .from('exhibition_visitors')
      .update({
        is_converted: true,
        converted_at: new Date().toISOString(),
      })
      .eq('id', visitorId);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error marking visitor as converted:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

/**
 * Get visitor details by ID (for confirmation)
 */
export const getVisitorDetails = async (
  visitorId: string
): Promise<{
  name: string;
  work_phone: string;
  programs: string[];
  metadata: VisitorMetadata | null;
  is_converted: boolean;
  converted_at: string | null;
} | null> => {
  if (!supabase) return null;

  try {
    // Get visitor
    const { data: visitor, error: visitorError } = await supabase
      .from('exhibition_visitors')
      .select('name, work_phone, is_converted, converted_at')
      .eq('id', visitorId)
      .single();

    if (visitorError) throw visitorError;

    // Get programs
    const programNames: string[] = [];
    
    // First, try standard relation join select
    const { data: programs, error: programsError } = await supabase
      .from('visitor_programs')
      .select('programs(name)')
      .eq('visitor_id', visitorId);

    let fetchedNames = false;

    if (!programsError && programs && programs.length > 0) {
      for (const item of programs) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const program = (item as any)?.programs;
        if (program?.name) {
          programNames.push(program.name);
          fetchedNames = true;
        }
      }
    }

    // Try fallback relation join with program_name if not fetched
    if (!fetchedNames) {
      const { data: programsAlt, error: programsAltError } = await supabase
        .from('visitor_programs')
        .select('programs(program_name)')
        .eq('visitor_id', visitorId);

      if (!programsAltError && programsAlt && programsAlt.length > 0) {
        for (const item of programsAlt) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const program = (item as any)?.programs;
          if (program?.program_name) {
            programNames.push(program.program_name);
            fetchedNames = true;
          }
        }
      }
    }

    // Secondary fallback: If relations are missing in schema cache, fetch program ids first, then names
    if (!fetchedNames) {
      const { data: vpRows, error: vpError } = await supabase
        .from('visitor_programs')
        .select('program_id')
        .eq('visitor_id', visitorId);

      if (!vpError && vpRows && vpRows.length > 0) {
        const programIds = vpRows.map((r: { program_id: number }) => r.program_id);
        const { data: pRows, error: pError } = await supabase
          .from('programs')
          .select('name, program_name')
          .in('id', programIds);

        if (!pError && pRows) {
          for (const p of pRows) {
            if (p.name) programNames.push(p.name);
            else if (p.program_name) programNames.push(p.program_name);
          }
        }
      }
    }

    // Get metadata
    const { data: metadata, error: metadataError } = await supabase
      .from('visitor_metadata')
      .select('*')
      .eq('visitor_id', visitorId)
      .single();

    if (metadataError) console.error('Metadata fetch error:', metadataError);

    return {
      name: visitor.name,
      work_phone: visitor.work_phone,
      programs: programNames,
      metadata: metadata || null,
      is_converted: visitor.is_converted || false,
      converted_at: visitor.converted_at || null,
    };
  } catch (error) {
    console.error('Error fetching visitor details:', error);
    return null;
  }
};

import { createClient } from '@supabase/supabase-js';
import { VisitorFormData, Program, VisitorMetadata } from '@/types';

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

/**
 * Fetch all active programs
 */
export const fetchPrograms = async (): Promise<Program[]> => {
  if (!supabase) {
    // Return mock data in demo mode
    return [
      { id: 1, program_name: 'Computer Science', category: 'Engineering', is_active: true },
      { id: 2, program_name: 'Business Administration', category: 'Business', is_active: true },
      { id: 3, program_name: 'Mechanical Engineering', category: 'Engineering', is_active: true },
      { id: 4, program_name: 'Data Science', category: 'Technology', is_active: true },
      { id: 5, program_name: 'Civil Engineering', category: 'Engineering', is_active: true },
      { id: 6, program_name: 'Marketing', category: 'Business', is_active: true },
      { id: 7, program_name: 'Artificial Intelligence', category: 'Technology', is_active: true },
      { id: 8, program_name: 'Architecture', category: 'Design', is_active: true },
    ];
  }

  try {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('is_active', true)
      .order('category', { ascending: true })
      .order('program_name', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching programs:', error);
    return [];
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

    // Step 1: Insert visitor
    const { data: visitor, error: visitorError } = await supabase
      .from('exhibition_visitors')
      .insert([
        {
          name: formData.name,
          work_phone: formData.workPhone,
          is_converted: false, // Default to not converted
          converted_at: null,
        },
      ])
      .select()
      .single();

    if (visitorError) throw visitorError;
    if (!visitor) throw new Error('Failed to create visitor record');

    const visitorId = visitor.id;

    // Step 2: Insert visitor programs (selected courses)
    const programInserts = formData.selectedPrograms.map((programId) => ({
      visitor_id: visitorId,
      program_id: programId,
    }));

    const { error: programsError } = await supabase
      .from('visitor_programs')
      .insert(programInserts);

    if (programsError) throw programsError;

    // Step 3: Insert visitor metadata
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

    if (metadataError) throw metadataError;

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
    const { data: programs, error: programsError } = await supabase
      .from('visitor_programs')
      .select('programs(program_name)')
      .eq('visitor_id', visitorId);

    if (programsError) throw programsError;

    // Get metadata
    const { data: metadata, error: metadataError } = await supabase
      .from('visitor_metadata')
      .select('*')
      .eq('visitor_id', visitorId)
      .single();

    if (metadataError) console.error('Metadata fetch error:', metadataError);

    // Extract program names from Supabase response
    const programNames: string[] = [];
    if (programs) {
      for (const item of programs) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const program = (item as any)?.programs;
        if (program?.program_name) {
          programNames.push(program.program_name);
        }
      }
    }

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

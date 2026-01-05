# Project Architecture

## Overview

This project follows a modern Next.js 14 App Router architecture with a focus on modularity, type safety, and performance.

## Directory Structure

```
Exhibition-ui/
│
├── app/                        # Next.js App Router
│   ├── layout.tsx             # Root layout (metadata, fonts)
│   ├── page.tsx               # Home page (entry point)
│   └── globals.css            # Global styles & Tailwind imports
│
├── components/                 # React components (client-side)
│   ├── ExhibitionRegistration.tsx  # Main orchestrator component
│   ├── IntroScreen.tsx            # Intro animation screen
│   ├── RegistrationForm.tsx       # Form component
│   ├── SuccessScreen.tsx          # Success state component
│   ├── Logo.tsx                   # Logo SVG component
│   └── PaperPlane.tsx             # Paper plane animation
│
├── lib/                        # Business logic & utilities
│   ├── supabase.ts            # Supabase client & API calls
│   └── validation.ts          # Form validation logic
│
├── types/                      # TypeScript type definitions
│   └── index.ts               # Shared interfaces & types
│
└── [config files]             # Configuration files
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.ts
    ├── next.config.js
    ├── postcss.config.js
    └── .eslintrc.json
```

## Architecture Principles

### 1. Separation of Concerns

**Components** (Presentation)
- Handle UI rendering
- Manage local UI state
- Delegate business logic to lib functions

**Lib** (Business Logic)
- API communication
- Data validation
- Utility functions

**Types** (Data Models)
- Shared interfaces
- Type definitions
- Ensure type safety across the app

### 2. Component Hierarchy

```
ExhibitionRegistration (Main Orchestrator)
├── IntroScreen
│   └── Logo
├── RegistrationForm
└── SuccessScreen
    └── (Display data)
PaperPlane (Shared Animation Component)
```

### 3. State Management

**Local State (useState)**
- `showIntro`: Controls intro/form view
- `formData`: Form input values
- `errors`: Validation errors
- `isSubmitting`: Loading state
- `isSuccess`: Success screen toggle

**Refs (useRef)**
- Animation targets (GSAP)
- DOM element references

### 4. Animation Strategy

**GSAP Timeline Approach**
- Create timeline on component mount
- Chain animations with stagger effects
- Clean up on unmount to prevent memory leaks

**Example Pattern:**
```typescript
useEffect(() => {
  const tl = gsap.timeline();
  
  tl.fromTo(element, from, to);
  tl.to(element, animation, offset);
  
  return () => tl.kill(); // Cleanup
}, [dependencies]);
```

### 5. Data Flow

```
User Input
    ↓
Component Handler (onChange, onSubmit)
    ↓
Validation (lib/validation.ts)
    ↓
API Call (lib/supabase.ts)
    ↓
Update State
    ↓
Re-render UI
```

## Key Design Patterns

### 1. Controlled Components
All form inputs are controlled components:
```typescript
<input
  value={formData.name}
  onChange={handleChange}
/>
```

### 2. Composition
Small, focused components composed together:
- `Logo`: Reusable SVG component
- `PaperPlane`: Animated element with forwardRef
- `IntroScreen`, `RegistrationForm`, `SuccessScreen`: Feature components

### 3. Prop Drilling (Intentional)
Props passed explicitly for clarity:
- `formData`, `errors`, `isSubmitting` to `RegistrationForm`
- `formData` to `SuccessScreen`
- Clear data flow, easy to trace

### 4. Error Handling
- Client-side validation before submission
- Try-catch for API calls
- Graceful degradation (works without Supabase)

## Component Responsibilities

### ExhibitionRegistration (Main)
**Purpose**: Application orchestrator
- Manages global state
- Coordinates screen transitions
- Handles form submission logic
- Delegates to child components

### IntroScreen
**Purpose**: Welcome animation
- GSAP-powered intro sequence
- Calls `onComplete` when finished
- Self-contained animation logic

### RegistrationForm
**Purpose**: Data collection
- Renders form inputs
- Displays validation errors
- Handles user interactions
- Entry animations on mount

### SuccessScreen
**Purpose**: Confirmation display
- Shows submitted data
- Provides "Register Another" action
- Success animations

### Logo & PaperPlane
**Purpose**: Reusable visual elements
- SVG graphics
- Exportable for use elsewhere
- Clean, semantic markup

## Type System

### Core Types
```typescript
interface VisitorFormData {
  name: string;
  workPhone: string;
  region: string;
}

interface FormErrors {
  name?: string;
  workPhone?: string;
}

interface VisitorRecord extends VisitorFormData {
  id?: string;
  created_at?: string;
}
```

### Type Safety Benefits
- Autocomplete in IDE
- Compile-time error detection
- Self-documenting code
- Refactoring safety

## Performance Considerations

### 1. Code Splitting
- Next.js automatically splits routes
- Components lazy-load when needed

### 2. Animation Performance
- GSAP uses hardware-accelerated transforms
- CSS transforms (translateX, translateY, scale)
- Avoid animating layout properties (width, height)

### 3. Optimization Techniques
- Functional updates for state
- Event handler memoization opportunity (could add useCallback)
- Cleanup functions for animations

## Responsive Design Strategy

### Mobile-First Approach
Base styles → Mobile
Then add breakpoints for larger screens:
- `sm:` (640px+) - Small tablets
- `md:` (768px+) - Tablets
- `lg:` (1024px+) - Desktops
- `xl:` (1280px+) - Large desktops

### Responsive Patterns
```typescript
// Text sizing
className="text-sm sm:text-base md:text-lg"

// Spacing
className="p-3 sm:p-4 md:p-6"

// Layout
className="flex-col sm:flex-row"
```

## Extensibility

### Adding New Fields
1. Update `VisitorFormData` type in `types/index.ts`
2. Update `INITIAL_FORM_DATA` in `ExhibitionRegistration.tsx`
3. Add input in `RegistrationForm.tsx`
4. Update validation in `lib/validation.ts`
5. Update Supabase schema if applicable

### Adding New Screens
1. Create component in `components/`
2. Add state in `ExhibitionRegistration.tsx`
3. Add conditional render in return statement

### Customizing Animations
- Edit GSAP timelines in component `useEffect`
- Adjust duration, ease, stagger values
- Add new animation sequences

## Security Considerations

### Environment Variables
- All secrets in `.env.local`
- Never commit `.env.local` to git
- Use `NEXT_PUBLIC_` prefix for client-side vars

### Input Validation
- Client-side validation (UX)
- Server-side validation required (security)
- Sanitize inputs in production API

### Supabase Security
- Row Level Security (RLS) enabled
- Policies restrict data access
- Anon key safe for client use

## Testing Strategy (Future)

### Unit Tests
- `lib/validation.ts` - Pure functions
- Individual component logic

### Integration Tests
- Form submission flow
- API interactions

### E2E Tests
- Full user journey
- Animation completions

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Supabase project created
- [ ] Database table created
- [ ] RLS policies set
- [ ] Build passes (`npm run build`)
- [ ] No console errors
- [ ] Mobile tested
- [ ] Performance optimized

## Future Enhancements

### Potential Features
- Multi-step form
- File upload (visitor photo)
- Email confirmation
- Analytics tracking
- Admin dashboard
- Export data to CSV
- QR code generation
- Multiple language support

### Potential Refactors
- Add React Query for data fetching
- Add Zustand for state management
- Add Zod for runtime validation
- Add Storybook for component docs
- Add Jest/Vitest for testing
- Add Cypress for E2E testing

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [GSAP Docs](https://greensock.com/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)


import { useState } from 'react';
import '@theme-lab/tokens/tokens.css';
import '@theme-lab/components';

// Type declarations for Theme Lab web components
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'tl-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
        size?: 'sm' | 'md' | 'lg';
        disabled?: boolean;
        loading?: boolean;
      };
      'tl-input': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        placeholder?: string;
        value?: string;
        type?: string;
        size?: 'sm' | 'md' | 'lg';
        error?: boolean;
        disabled?: boolean;
      };
      'tl-checkbox': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        label?: string;
        checked?: boolean;
        disabled?: boolean;
      };
      'tl-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        variant?: 'default' | 'bordered' | 'elevated';
        padding?: 'none' | 'sm' | 'md' | 'lg';
        interactive?: boolean;
      };
      'tl-badge': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'outline';
        size?: 'sm' | 'md' | 'lg';
        dot?: boolean;
      };
    }
  }
}

export default function App() {
  const [name, setName] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (name.trim() && accepted) {
      setSubmitted(true);
    }
  };

  return (
    <main style={styles.main}>
      <h1 style={styles.title}>Theme Lab + React Example</h1>

      <tl-card>
        <h2 slot="header">Registration Form</h2>

        <div style={styles.formGroup}>
          <label style={styles.label}>Your Name</label>
          <tl-input
            placeholder="Enter your name"
            onInput={(e: any) => setName(e.target.value)}
          />
        </div>

        <div style={styles.formGroup}>
          <tl-checkbox
            label="I accept the terms and conditions"
            checked={accepted}
            onChange={(e: any) => setAccepted(e.target.checked)}
          />
        </div>

        <div slot="footer">
          <tl-button
            variant="primary"
            onClick={handleSubmit}
            disabled={!name || !accepted}
          >
            Submit
          </tl-button>
        </div>
      </tl-card>

      {submitted && (
        <tl-badge variant="success" dot>
          Form submitted successfully!
        </tl-badge>
      )}
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '1rem',
    fontFamily: 'var(--tl-typography-fontFamily-sans)',
  },
  title: {
    color: 'var(--tl-color-foreground-base)',
    marginBottom: '2rem',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: 'var(--tl-color-foreground-muted)',
    fontSize: 'var(--tl-typography-fontSize-sm)',
  },
};

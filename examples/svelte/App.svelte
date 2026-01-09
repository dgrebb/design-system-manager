<script>
  // Import tokens globally
  import '@theme-lab/tokens/tokens.css';
  
  // Import and register web components
  import '@theme-lab/components';
  
  let checked = $state(false);
  let name = $state('');
  let submitted = $state(false);
  
  function handleSubmit() {
    if (checked && name.trim()) {
      submitted = true;
    }
  }
</script>

<main>
  <h1>Theme Lab + Svelte 5 Example</h1>
  
  <tl-card>
    <h2 slot="header">Registration Form</h2>
    
    <div class="form-group">
      <label for="name">Your Name</label>
      <tl-input
        id="name"
        placeholder="Enter your name"
        oninput={(e) => (name = e.target.value)}
      />
    </div>
    
    <div class="form-group">
      <tl-checkbox
        label="I accept the terms and conditions"
        checked={checked}
        onchange={(e) => (checked = e.target.checked)}
      />
    </div>
    
    <div slot="footer">
      <tl-button variant="primary" onclick={handleSubmit} disabled={!name || !checked}>
        Submit
      </tl-button>
    </div>
  </tl-card>
  
  {#if submitted}
    <tl-badge variant="success" dot>Form submitted successfully!</tl-badge>
  {/if}
</main>

<style>
  main {
    max-width: 600px;
    margin: 2rem auto;
    padding: 1rem;
    font-family: var(--tl-typography-fontFamily-sans);
  }
  
  h1 {
    color: var(--tl-color-foreground-base);
    margin-bottom: 2rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--tl-color-foreground-muted);
    font-size: var(--tl-typography-fontSize-sm);
  }
</style>

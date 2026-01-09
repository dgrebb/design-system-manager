<script setup lang="ts">
import { ref } from 'vue';
import '@theme-lab/tokens/tokens.css';
import '@theme-lab/components';

const name = ref('');
const accepted = ref(false);
const submitted = ref(false);

function handleSubmit() {
  if (name.value.trim() && accepted.value) {
    submitted.value = true;
  }
}
</script>

<template>
  <main class="main">
    <h1 class="title">Theme Lab + Vue 3 Example</h1>

    <tl-card>
      <h2 slot="header">Registration Form</h2>

      <div class="form-group">
        <label class="label">Your Name</label>
        <tl-input
          placeholder="Enter your name"
          @input="(e: any) => (name = e.target.value)"
        />
      </div>

      <div class="form-group">
        <tl-checkbox
          label="I accept the terms and conditions"
          :checked="accepted"
          @change="(e: any) => (accepted = e.target.checked)"
        />
      </div>

      <div slot="footer">
        <tl-button
          variant="primary"
          :disabled="!name || !accepted"
          @click="handleSubmit"
        >
          Submit
        </tl-button>
      </div>
    </tl-card>

    <tl-badge v-if="submitted" variant="success" dot>
      Form submitted successfully!
    </tl-badge>
  </main>
</template>

<style scoped>
.main {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: var(--tl-typography-fontFamily-sans);
}

.title {
  color: var(--tl-color-foreground-base);
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

.label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--tl-color-foreground-muted);
  font-size: var(--tl-typography-fontSize-sm);
}
</style>

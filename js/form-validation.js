/* js/form-validation.js - Validation formulaires avec feedback progressif */

const FormValidation = {
  /* Validation d'un champ selon regles */
  validateField(field, rules) {
    const value = (field.value || '').trim();
    const errors = [];

    if (rules.required && !value) {
      errors.push(rules.required_message || `${rules.label || 'Ce champ'} est requis`);
    }
    if (rules.min_length && value.length < rules.min_length) {
      errors.push(`Minimum ${rules.min_length} caracteres`);
    }
    if (rules.max_length && value.length > rules.max_length) {
      errors.push(`Maximum ${rules.max_length} caracteres`);
    }
    if (rules.validation === 'email' && value && !Utils.isValidEmail(value)) {
      errors.push('Email invalide');
    }
    if (rules.validation === 'phone' && value && !Utils.isValidPhone(value)) {
      errors.push('Telephone invalide (8 chiffres)');
    }
    if (rules.validation === 'email_or_phone' && value && !Utils.isValidEmailOrPhone(value)) {
      errors.push('Email ou telephone invalide');
    }
    if (rules.pattern && value) {
      const re = new RegExp(rules.pattern);
      if (!re.test(value)) errors.push(rules.pattern_message || 'Format invalide');
    }
    return errors;
  },

  /* Valide un formulaire complet selon un schema */
  validateForm(form, schema) {
    const errors = {};
    schema.fields.forEach(rule => {
      const field = form.querySelector(`[name="${rule.id}"]`);
      if (!field) return;
      const fieldErrors = FormValidation.validateField(field, rule);
      if (fieldErrors.length) {
        errors[rule.id] = fieldErrors;
        FormValidation._showFieldError(field, fieldErrors[0]);
      } else {
        FormValidation._clearFieldError(field);
      }
    });
    return errors;
  },

  /* Affiche une erreur sous un champ */
  _showFieldError(field, message) {
    field.classList.add('is-invalid');
    field.setAttribute('aria-invalid', 'true');
    let errEl = field.parentNode.querySelector('.form-error');
    if (!errEl) {
      errEl = document.createElement('span');
      errEl.className = 'form-error';
      field.parentNode.appendChild(errEl);
    }
    errEl.textContent = message;
  },

  _clearFieldError(field) {
    field.classList.remove('is-invalid');
    field.removeAttribute('aria-invalid');
    const errEl = field.parentNode.querySelector('.form-error');
    if (errEl) errEl.remove();
  },

  /* Validation live sur blur + input */
  attachLiveValidation(form, schema) {
    schema.fields.forEach(rule => {
      const field = form.querySelector(`[name="${rule.id}"]`);
      if (!field) return;
      field.addEventListener('blur', () => {
        const errs = FormValidation.validateField(field, rule);
        if (errs.length) FormValidation._showFieldError(field, errs[0]);
        else FormValidation._clearFieldError(field);
      });
      field.addEventListener('input', () => {
        if (field.classList.contains('is-invalid')) {
          const errs = FormValidation.validateField(field, rule);
          if (!errs.length) FormValidation._clearFieldError(field);
        }
      });
    });
  }
};

window.FormValidation = FormValidation;

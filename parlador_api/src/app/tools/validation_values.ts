/* eslint-disable camelcase */
class ValidationValues {
  validation_email (email:string) {
    if (email.length > 320) return false

    // todo email deve ter @ e . no seu endereço
    if (email.indexOf('@') === -1 || email.indexOf('.') === -1) return false

    const emailRegex =
        /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

    if (!emailRegex.test(email)) return false

    const [local, domain] = email.split('@')

    if (local.length > 64 || local.length === 0) return false

    if (domain.length > 64 || domain.length === 0) return false

    return true
  }

  validation_post (text:string) {
    if (!text.split(' ').join('')) return false
    if (!text) return false
    if (text.length > 280) return false
    return true
  }

  validation_spaces (text:string) {
    if (!text.split(' ').join('')) return false
    return true
  }
}

export default new ValidationValues()

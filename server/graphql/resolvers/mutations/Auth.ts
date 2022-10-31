/*=============================================== Auth mutations ===============================================*/

const AuthMutation = {
    login: async (
        _: any,
        { loginInput: { email, password } }: any,
        { login }: any
    ) => await login({ email, password }),

    forgotPassword: async (
        _: any,
        { forgotInput: { email } }: any,
        { forgotPassword }: any
    ) => {
        return await forgotPassword({ email })
    },

    resetPassword: async (
        _: any,
        { resetInput: { _id, resetToken, password } }: any,
        { resetPassword }: any
    ) => {
        return await resetPassword({ _id, resetToken, password })
    },
}

export { AuthMutation }

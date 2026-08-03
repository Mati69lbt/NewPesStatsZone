function LoginForm({ email, password, onEmailChange, onPasswordChange, onSubmit, onSwitchToRegister, loading }) {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-sm rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 shadow-xl backdrop-blur sm:p-8"
    >
      <h1 className="mb-1 text-center text-2xl font-black uppercase tracking-wide text-white">
        Iniciar sesión
      </h1>
      <p className="mb-6 text-center text-sm text-neutral-400">
        Ingresá tus credenciales para continuar
      </p>

      <div className="mb-4">
        <label htmlFor="email" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="tu@email.com"
          className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-white placeholder-neutral-500 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/40"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          placeholder="••••••••"
          className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-white placeholder-neutral-500 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/40"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-lime-400 py-2.5 font-bold uppercase tracking-wide text-neutral-900 transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Ingresando...' : 'Entrar'}
      </button>

      <p className="mt-5 text-center text-sm text-neutral-400">
        ¿No tenés cuenta?{' '}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="font-semibold text-lime-400 hover:text-lime-300"
        >
          Registrarme
        </button>
      </p>
    </form>
  )
}

export default LoginForm

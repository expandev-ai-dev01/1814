export const HomePage = () => {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Bem-vindo ao Catálogo de Carros
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">Encontre o veículo perfeito para você</p>
      </section>

      <section className="rounded-lg border bg-card p-8 shadow-sm">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="rounded-full bg-primary/10 p-4">
            <svg
              className="h-12 w-12 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold">Aplicação Pronta</h2>
          <p className="text-center text-muted-foreground">
            A estrutura base foi criada com sucesso. Agora você pode começar a implementar as
            funcionalidades.
          </p>
        </div>
      </section>
    </div>
  );
};

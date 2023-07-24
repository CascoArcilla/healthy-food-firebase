export default function HeaderLogin() {
  const headerStyles = `mb-6 max-[640px]: max-[640px]: max-[450px]:rounded-none`;
  return (
    <div className={`${headerStyles}`}>
      <h1 className="text-center mb-2">INICIAR SESIÓN</h1>
      <p data-testid="description" className="text-justify font-semibold">
        Bienvenido al inicio de sesión de Healty Food, aplicación local para
        ayudar a promover una buena salud a través de los alimentos.
      </p>
    </div>
  );
}

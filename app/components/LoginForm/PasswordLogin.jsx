import TextField from "../TextField/TextField";
import { IoKeySharp } from "react-icons/io5";
import { stylesInput } from "./stylesLogin";

export default function PasswordLogin() {
  return (
    <div>
      <TextField
        name="password"
        type="password"
        label="Contraseña"
        placeholder="Tu contraseña"
        icon={<IoKeySharp data-testid="icon-key" />}
        required
        data-cy="password-field"
        data-testid="input-password"
      ></TextField>
    </div>
  );
}

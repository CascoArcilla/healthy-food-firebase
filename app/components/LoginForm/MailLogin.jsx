import TextField from "../TextField/TextField";
import { HiMail } from "react-icons/hi";
import { stylesInput } from "./stylesLogin";

export default function MailLogin() {
  return (
    <div>
      <TextField
        name="email"
        type="email"
        label="Correo"
        placeholder="tu@pensemosweb.com"
        icon={<HiMail data-testid="icon-mail" />}
        required
        data-cy="email-field"
        data-testid="input-mail"
      ></TextField>
    </div>
  );
}

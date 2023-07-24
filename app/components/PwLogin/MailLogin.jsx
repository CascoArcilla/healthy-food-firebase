import TextField from "../TextField/TextField";
import { HiMail } from "react-icons/hi";
import { stylesInput } from "./stylesLogin";

export default function MailLogin() {
  return (
    <div className="mail-login">
      <label htmlFor="email" className={`${stylesInput.label}`}>
        Correo
      </label>
      <div className="relative mb-6">
        <div data-testid="icon-mail" className={`${stylesInput.icon}`}>
          <HiMail />
        </div>
        <TextField
          idInput="email"
          name="email"
          placeholder="tu@pensemosweb.com"
          type="email"
          required
          data-cy="email-field"
          data-testid="input-mail"
          className={`${stylesInput.textField}`}
        ></TextField>
      </div>
    </div>
  );
}

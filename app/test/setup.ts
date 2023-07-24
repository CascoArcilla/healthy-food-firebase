import "@testing-library/jest-dom/extend-expect";
import { installGlobals } from "@remix-run/node";

// install globalls like atob, btoa, fetch, Response, Headers, fetch, AbortContoller, etc.
installGlobals();

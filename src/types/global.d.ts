/// <reference types="vite/client" />
declare namespace NodeJS {
  interface Process {
    pkg?: boolean;
  }
}
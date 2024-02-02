/// <reference types="@module-federation/runtime" />
/// <reference types="webpack/module" />

declare namespace NodeJS {
    interface ProcessEnv {
        MF_VERSION?: '1.5'
    }
}

import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        languageOptions: {
            globals: {
                window: "readonly",
                document: "readonly",
                gsap: "readonly",
                ScrollTrigger: "readonly",
                console: "readonly",
                Math: "readonly",
                parseInt: "readonly"
            }
        },
        rules: {
            "no-unused-vars": "warn"
        }
    }
];

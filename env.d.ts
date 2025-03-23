declare global {
	namespace NodeJS {
		interface ProcessEnv {
			GH_TOKEN: string;
		}
	}
}

export {};

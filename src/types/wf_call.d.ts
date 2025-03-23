export interface WorkflowCall {
	/**
	 * When using the workflow_call keyword, you can optionally specify inputs that are passed to the called workflow from the caller workflow.
	 */
	inputs?: {
		/**
		 * A string identifier to associate with the input. The value of <input_id> is a map of the input's metadata. The <input_id> must be a unique identifier within the inputs object. The <input_id> must start with a letter or _ and contain only alphanumeric characters, -, or _.
		 *
		 * This interface was referenced by `undefined`'s JSON-Schema definition
		 * via the `patternProperty` "^[_a-zA-Z][a-zA-Z0-9_-]*$".
		 */
		[k: string]: {
			/**
			 * A string description of the input parameter.
			 */
			description?: string;
			/**
			 * A boolean to indicate whether the action requires the input parameter. Set to true when the parameter is required.
			 */
			required?: boolean;
			/**
			 * Required if input is defined for the on.workflow_call keyword. The value of this parameter is a string specifying the data type of the input. This must be one of: boolean, number, or string.
			 */
			type: 'boolean' | 'number' | 'string';
			/**
			 * The default value is used when an input parameter isn't specified in a workflow file.
			 */
			default?: boolean | number | string;
		};
	};
	/**
	 * A map of the secrets that can be used in the called workflow. Within the called workflow, you can use the secrets context to refer to a secret.
	 */
	secrets?: {
		/**
		 * A string identifier to associate with the secret.
		 *
		 * This interface was referenced by `undefined`'s JSON-Schema definition
		 * via the `patternProperty` "^[_a-zA-Z][a-zA-Z0-9_-]*$".
		 */
		[k: string]: {
			/**
			 * A string description of the secret parameter.
			 */
			description?: string;
			/**
			 * A boolean specifying whether the secret must be supplied.
			 */
			required: boolean;
		};
	};
	[k: string]: unknown;
}

export interface Input {
	name: string;
	values: {
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
		type?: 'boolean' | 'number' | 'string';
		/**
		 * The default value is used when an input parameter isn't specified in a workflow file.
		 */
		default?: boolean | number | string;
	};
}

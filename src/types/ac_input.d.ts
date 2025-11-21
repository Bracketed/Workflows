export interface ActionCallInputs {
	/**
	 * A string identifier to associate with the input. The value of `<input_id>` is a map of the input's metadata. The `<input_id>` must be a unique identifier within the inputs object. The `<input_id>` must start with a letter or `_` and contain only alphanumeric characters, `-`, or `_`.
	 *
	 * This interface was referenced by `undefined`'s JSON-Schema definition
	 * via the `patternProperty` "^[_a-zA-Z][a-zA-Z0-9_-]*$".
	 */
	[k: string]: {
		/**
		 * A string description of the input parameter.
		 */
		description: string;
		/**
		 * A string shown to users using the deprecated input.
		 */
		deprecationMessage?: string;
		/**
		 * A boolean to indicate whether the action requires the input parameter. Set to `true` when the parameter is required.
		 */
		required?: boolean;
		/**
		 * A string representing the default value. The default value is used when an input parameter isn't specified in a workflow file.
		 */
		default?: string;
	};
}

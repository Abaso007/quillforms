export type Provider = {
	slug: string;
	label: string;
};

export type SetupFields = {
	[ key: string ]: {
		label: string;
		type: 'text' | 'select';
		check: boolean;
		options?: { key: string; name: string }[];
	};
};

export type Setup = {
	Instructions: React.FC;
	fields: SetupFields;
};

export type AccountsAuthFields = {
	[ key: string ]: {
		label: string;
		type: 'text' | 'select';
		options?: { key: string; name: string }[];
	};
};

export type AccountsLabels = {
	singular: string;
	plural: string;
};

export type AccountsAuth = {
	type: 'credentials' | 'oauth';
	fields?: AccountsAuthFields;
	Instructions?: React.FC;
};

export type ConnectMainAccounts = {
	auth: AccountsAuth;
	labels?: AccountsLabels;
};

export type ConnectMain = {
	connection: {
		runable?: boolean;
		accounts?: ConnectMainAccounts;
		options: {
			default: { [ x: string ]: any };
			Component: React.FC< { connectionId: string } >;
			validate?: ( args: { connection: any; account?: any } ) => {
				valid: boolean;
				message?: string;
			};
		};
	};
};

export type SettingsMainAccounts = {
	auth: AccountsAuth;
	labels?: AccountsLabels;
	actions?: React.FC< { accountId: string } >[];
};

export type SettingsMain = {
	accounts: SettingsMainAccounts;
	helpers?: React.FC[];
};

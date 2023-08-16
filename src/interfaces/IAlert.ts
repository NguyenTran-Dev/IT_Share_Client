export interface IAlert {
  status?: 'info' | 'warning' | 'success' | 'error' | 'loading' | undefined;
  title?: string;
  desc?: string;
  isOpen?: boolean;
}

export interface IAlertParam {
  status: number;
  title: string;
  desc?: string;
  isOpen?: boolean;
}


export interface IAlertContext {
  alert: IAlert;
  // eslint-disable-next-line no-unused-vars
  showAlert: (items: IAlertParam) => void;
  hideAlert: () => void;
}

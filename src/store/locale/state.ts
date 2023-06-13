export interface LocaleStateInterface {
  locale: string;
}

function state(): LocaleStateInterface {
  return {
    locale: 'en-us',
  };
}

export default state;

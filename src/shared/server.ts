import { Widget } from '../components/widget/widget';

const baseURL = `
https://w-api2.aplaut.io/widgets/v2/render.json
?authentication_token=56fa337b8ddf870c76021a5f
&context=product
&context_id=10350209
&theme_id=default
&widget_id=product-reviews
`;

export async function getWidgetData(params: string[] = ['']): Promise<Widget> {
  const serverResponse = await fetch(`${baseURL}&${params.join('&')}`);

  const data: Widget = await serverResponse.json();

  console.log(data);

  return data;
}

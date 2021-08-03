function serverUrlGenerator(serverSection: string): string {
    return `https://w-api2.aplaut.io/${serverSection}`;
    return `https://w-api2.aplaut.io/widgets/v2/render.json?authentication_token=56fa337b8ddf870c76021a5f&context=product&context_id=10350209&theme_id=default&widget_id=product-reviews`;
}

const server = {
    garage: serverUrlGenerator('garage'),
    engine: serverUrlGenerator('engine'),
    winners: serverUrlGenerator('winners'),
};

export async function getWidgetData(params: string[] = ['']) {
  console.log(`https://w-api2.aplaut.io/widgets/v2/render.json?authentication_token=56fa337b8ddf870c76021a5f&context=product&context_id=10350209&theme_id=default&widget_id=product-reviews&${params.join('&')}`);
  const serverResponse = await fetch(`https://w-api2.aplaut.io/widgets/v2/render.json?authentication_token=56fa337b8ddf870c76021a5f&context=product&context_id=10350209&theme_id=default&widget_id=product-reviews&${params.join('&')}`);
  const data: { [key: string]: string }[] = await serverResponse.json();
  return data;
}
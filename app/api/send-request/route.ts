import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const token = '8772895390:AAGSyxW2-hEUTjnhaHFgjIQXN2MeaYBUjqg';
    const chatId = '1444596921';
    
    // Текст сообщения
    const message = `🔥 SOKIWRDL\nContact: ${data.contact}\nSteam: ${data.steam}\nGitHub: ${data.github}\nDiscord: ${data.discord}\n\nStory: ${data.story}`;

    // Отправка через URL параметры (самый безотказный метод)
    const url = `https://telegram.org{token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    const response = await fetch(url);

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      const errTxt = await response.text();
      console.log('TG ERROR:', errTxt);
      return NextResponse.json({ success: false }, { status: 500 });
    }
  } catch (error) {
    console.log('SERVER ERROR:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

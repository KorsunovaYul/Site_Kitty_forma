import ContactForm from "@/components/contact-form" // Import the ContactForm component

export default function Home() {
  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="logo">
          <a href="/">PPS</a>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#home">о компании</a>
            </li>
            <li className="nav-item">
              <a href="#about">услуги</a>
            </li>
            <li className="nav-item">
              <a href="#reviews">отзывы</a>
            </li>
            <li className="zapis" style={{ paddingLeft: "4vw" }}>
              <a href="#contact">запись</a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {/* Section 1 - Hero */}
        <section id="1" style={{ paddingTop: "8%" }}>
          <div className="flex1">
            <div className="flex2">
              <h1 style={{ paddingTop: "14%", width: "43vw" }}>
                Purrfect <br />
                Paws Spa
              </h1>
              <p style={{ paddingTop: "11%", lineHeight: 1.2 }}>
                Элитный уход для ваших пушистых <br /> аристократов!
              </p>
              <div className="zapis" style={{ paddingTop: "5%", fontSize: "1.1em" }}>
                <a href="#contact">запись</a>
              </div>
            </div>
            <img src="/photo/linia2.png" alt="украшение" style={{ paddingTop: "8%", height: "12%" }} />
            <img src="/photo/linia2.png" alt="украшение" style={{ paddingTop: "20%", height: "12%" }} />
            <img src="/photo/32ag25dbeou31.png" alt="кот" style={{ width: "37%", height: "20%" }} />
          </div>
        </section>

        <img src="/photo/linia.png" alt="украшение" style={{ paddingTop: "3%", width: "70vw" }} />

        {/* Section 2 - Services */}
        <section id="2" style={{ paddingTop: "3%" }}>
          <h2>Наши предложения</h2>
          <p style={{ paddingTop: "3%", lineHeight: 1.2 }}>
            Мы знаем, как важен комфорт и красота для вашего питомца. В Purrfect Paws Spa мы предлагаем эксклюзивные
            услуги по уходу за кошками: от модных укладок до расслабляющих массажей. <br /> <br />
            Здесь каждая мурлыка почувствует себя звездой!
          </p>

          <div className="flex-container" style={{ paddingTop: "3%" }}>
            <div className="flex-item">
              <img src="/photo/ac92a3aedb93bfb0d69a0c7423ab8232.jpg" alt="Роскошный кошачий маникюр" />
            </div>
            <div className="flex-item">
              <img src="/photo/b0b23181751415f4fe1bd036e0e06a9a.jpg" alt="Шерстяное совершенство: стильные укладки" />
            </div>
            <div className="flex-item">
              <img src="/photo/368211fc8ed7100069b039ac80979cc1.jpg" alt="Модный прокат одежды" />
            </div>
            <div className="flex-item">
              <img src="/photo/8bde4b29e8d3c54f2b61278173e92afe.jpg" alt="Вечеринки и мероприятия для кошек" />
            </div>
          </div>

          <div className="flex-container" style={{ paddingTop: "2%" }}>
            <div className="flex-text">Роскошный кошачий маникюр</div>
            <div className="flex-text">Шерстяное совершенство: стильные укладки</div>
            <div className="flex-text">Модный прокат одежды</div>
            <div className="flex-text">
              Вечеринки <br />и мероприятия <br />
              для кошек
            </div>
          </div>
        </section>

        <img src="/photo/linia.png" alt="украшение" style={{ paddingTop: "3%", width: "70vw" }} />

        {/* Section 3 - Contact Form */}
        <section id="3" style={{ paddingTop: "3%" }}>
          <h2>Ваши пожелания</h2>
          <p style={{ paddingTop: "3%", lineHeight: 1.2 }}>
            Мы всегда рады ответить на ваши вопросы и помочь вам записаться на наши услуги. Свяжитесь с нами удобным для
            вас способом или приходите к нам в гости.
          </p>

          <div className="ofor_forma" style={{ marginTop: "2%" }}>
            <div className="line"></div>
            <ContactForm />
            <div className="line"></div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="flex_dla_foot_1">
          <p>контакты</p>
          <div className="flex_dla_foot_2">
            <div className="flex_dla_foot_3">
              <a href="#tg">
                <img src="/photo/seti/tg.png" alt="Telegram" />
                телеграмм
              </a>
            </div>
            <div className="flex_dla_foot_3">
              <a href="#vk">
                <img src="/photo/seti/vk.png" alt="VK" />
                vkонтакте
              </a>
            </div>
            <br />
            <div className="flex_dla_foot_3">
              <a href="#mail">
                <img src="/photo/seti/pochta.png" alt="Mail" />
                pochta.ru
              </a>
            </div>
            <div className="flex_dla_foot_3">
              <a href="tel:+7-987-654-3210">
                <img src="/photo/seti/phone.png" alt="Phone" />8 (987) 654 32-10
              </a>
            </div>
            <div className="flex_dla_foot_3" style={{ alignSelf: "flex-end" }}>
              <div className="avtor" style={{ alignSelf: "flex-end", paddingLeft: "7vw" }}>
                <a href="#author">&copy;KorshunovaYulia</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

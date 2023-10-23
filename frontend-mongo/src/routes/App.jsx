import {
    CustomerReview,
    Footer,
    Hero,
    PopularProducts,
    Services,
    Subscribe,
    SuperQuality,
    SpecialOffer
} from '../sections/exportSection'

import Nav from '../components/Nav';


const App = () => {
  return (
    <main className="relative w-full">
        <Nav />
        <section className="xl:padding-1
        wide:padding-r padding-b">
            <Hero />
        </section>
        <section className="padding">
            <PopularProducts />
        </section>
        <section className="padding">
            <SuperQuality />
        </section>
        <section className="padding-x py-10">
            <Services />
        </section>
        <section className="padding">
            <SpecialOffer />
        </section>
        <section className="padding
        bg-pale-blue">
            <CustomerReview />
        </section>
        <section className="padding-x
        py-16 sm:py-32 w-full">
            <Subscribe />
        </section>
        <section className="padding-t
        pb-8 bg-black padding-x">
            <Footer />
        </section>
    </main>
  )
};

export default App;
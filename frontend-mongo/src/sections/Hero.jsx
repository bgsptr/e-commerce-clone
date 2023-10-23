import { arrowRight } from "../assets/icons"
import Button from "../components/Button";
import { statistics } from "../constants";
import { bigShoe1, bigShoe2, bigShoe3 } from "../assets/images";

const Hero = () => {
  return (
    <section id="home"
    className="border-2 border-red-500 
    min-h-screen flex-col xl:flex-row 
    justify-center gap-10 max-container p-2">
        <div className="relative xl:w-2/5 flex
        flex-col justify-center items-start
        max-xl:padding-x pt-28">
            <p className="text-xl font font-montserrat
            text-coral-red">Our Summer Collection</p>
            <h1 className="mt-10  max-sm:text-[72px]
            font-palanquin text-8xl max-sm:leading-[82]
            font-semibold"><span>The New Arrival</span>
                <br />
                <span className="text-coral-red">Nike
                </span> Shoes
            </h1>
            <p className="text-lg my-8 text-slate-gray
            leading-10 font-montserrat sm:max-w-sm">Discover stylish Nike arrivals, 
                quality comfort, and innovation for
                your active life.</p>
            <Button label="Shop Now" 
            iconURL={arrowRight}/>

            <div className="flex justify-start
            items-start mt-20 gap-16">
                {statistics.map((statistic) => {
                    return (
                        <div key={statistic.label}>
                            <p className="font-extrabold
                            text-4xl max-sm:text-base">
                                {statistic.value}</p>
                            <p className="px-2 font-montserrat
                            text-slate-gray text-sm">{statistic.label}</p>
                        </div>
                    )
                })}
                
            </div>
            <div className="relative">
                <img className="object-contain relative"
                    src={bigShoe1}
                    width={610}
                    height={500}
                    alt="bigShoe1"
                />
                {/* <img
                    src={bigShoe2}
                    alt="bigShoe2"
                />
                <img 
                    src={bigShoe3}
                    alt="bigShoe3"
                /> */}
            </div>
        </div>
    </section>
  )
}

export default Hero
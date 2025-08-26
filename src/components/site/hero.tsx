import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'

export default function Hero() {
  return (
    <section className="w-full bg-gradient-to-br from-green-50 via-white to-emerald-100/30 py-16 lg:py-16 ">
      <div className="container pt-8  px-0.5 sm:px-6 flex flex-col items-center gap-16">
        {/* Content */}
        <div className="space-y-4 px-1  text-center ">
          <h1 className="text-3xl leading-none  sm:text-6xl md:text-6xl font-bold text-gray-900 ">
            Take your business online
            <br />
             reach <span className=" decoration-green-600  underline underline-offset-4 decoration-4">more customers</span>
          </h1>

          <p className="text-sm sm:text-xl sm:mt-8 mt-2 text-gray-600 max-w-2xl mx-auto leading-tight">
            Create an <strong>Ecommerce store</strong> in under 90 seconds.<br></br> Perfect for both your online and offline business.
          </p>

          <div className="flex flex-row mt-6  gap-4 justify-center">
            <Button
              className=" text-xs bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 rounded-sm"
            >
              Create Ecommerce Store →
            </Button>

            <Button
              variant="outline"
              className=" text-xs border-green-300 text-green-600 hover:bg-green-50 gap-2 hover:border-green-400 px-8 py-3  rounded-sm transition-all duration-300"
            >
              <Play className="h-5 w-5 fill-green-600 text-green-600" />
              See Demo
            </Button>
          </div>

          <div className="flex flex-col items-center gap-4 text-green-700 font-medium ">
            {/* <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="h-10 w-10 rounded-full bg-green-100 border-2 border-white flex items-center justify-center shadow-sm"
                >
                  <span className="text-sm">🍔</span>
                </div>
              ))}
            </div> */}
            <span className="text-sm md:text-base">Trusted by 100+ Businesses</span>
          </div>
        </div>

        {/* IFrame */}
       
       <div className="relative px-3 w-full max-w-4xl mx-auto">
  {/* Browser Chrome */}
  <div className="bg-gray-100 rounded-t-xl p-3 flex items-center justify-between border border-gray-200">
    <div className="flex items-center space-x-2">
      <div className="w-3 h-3 rounded-full bg-red-400"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
      <div className="w-3 h-3 rounded-full bg-green-400"></div>
    </div>
    <div className="flex-1 mx-4 bg-white rounded-md py-1 px-3 text-xs text-gray-500 truncate">
      https://menulink.space/demo
    </div>
    <div className="w-6"></div>
  </div>
  
  {/* Iframe Container */}
  <div className="relative aspect-video bg-white rounded-b-xl border border-gray-200 border-t-0 shadow-lg overflow-hidden">
    <iframe 
      src="https://menulink.space/demo" 
      className="w-full h-full border-none"
      title="Digital Menu Preview"
      sandbox="allow-same-origin allow-scripts"
      loading="lazy"
    />
    <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-md z-10">
      Live Preview
    </div>
  </div>
  
</div>
      </div>
    </section>
  )
}
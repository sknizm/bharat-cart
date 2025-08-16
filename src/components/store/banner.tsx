import { Card } from "../ui/card";

export function Banner({ name, description }: { name?: string ,description?:string }) {
  if (!name) return null;

  return (
    <div className="relative overflow-hidden rounded-xl">
      <Card className={`
        w-full h-64 md:h-80 flex items-center justify-center 
        bg-gradient-to-r from-green-500 to-green-600
        p-6 text-center
        relative overflow-hidden
      `}>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 -left-20 w-64 h-64 rounded-full bg-white"></div>
          <div className="absolute bottom-10 -right-10 w-80 h-80 rounded-full bg-white"></div>
        </div>
        
        <div className="relative z-10 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Welcome to <span className="text-yellow-300">{name}</span>
          </h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
            {description}
          </p>
        
        </div>
      </Card>
    </div>
  )
}
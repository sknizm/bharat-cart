import Logo from "../ui/logo";
import { SidebarTrigger } from "../ui/sidebar";

export function DashboardHeader() {

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-white  px-4 shadow-sm md:px-6">
            <div className="flex items-center gap-4">
                {/* Mobile menu button (optional) */}

                <SidebarTrigger  className=" lg:hidden" />

                {/* Logo with better spacing */}
                <div className="flex items-center gap-2 bg-white rounded-lg border-2 border-white/20">
                    <Logo />
                </div>
            </div>


        </header>
    );
}
import { Star, Stethoscope, Clock3 } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '../ui/button'

export default function DoctorCardRow({ doctor }: any) {
    const fullName = `${doctor?.firstName || ""} ${doctor?.lastName || ""}`.trim() || "Doctor";
    const specialization = doctor?.doctor?.specialization || "General Practice";
    const experience = doctor?.doctor?.experience;

    return (
        <article className="group relative rounded-[2rem] border border-gray-100 dark:border-white/10 bg-white dark:bg-white/[0.02] p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-gray-100 dark:bg-white/10 mb-5">
                <img
                    src={doctor?.profileImageUrl || '/doctor.jpg'}
                    alt={fullName}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70" />

                <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 dark:bg-black/80 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-orange">
                    <Star className="h-3 w-3 fill-current" />
                    4.9
                </div>

                <div className="absolute left-3 right-3 bottom-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <Link to={`/appointment/${doctor?.id}`} className="block">
                        <Button className="w-full">Book Consultation</Button>
                    </Link>
                </div>
            </div>

            <div className="px-1 pb-1 space-y-3">
                <div>
                    <h4 className="text-lg sm:text-xl font-black tracking-tight uppercase dark:text-white line-clamp-1">
                        {fullName}
                    </h4>
                    <p className="mt-1 inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                        <Stethoscope className="w-3.5 h-3.5 text-orange" />
                        {specialization}
                    </p>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-gray-100 dark:border-white/10 bg-gray-50/70 dark:bg-white/[0.03] px-3 py-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Experience</span>
                    <div className="inline-flex items-center gap-1.5 text-xs font-black text-orange">
                        <Clock3 className="w-3.5 h-3.5" />
                        {experience ? `${experience} Years` : 'N/A'}
                    </div>
                </div>

                <Link to={`/appointment/${doctor?.id}`} className="block sm:hidden">
                    <Button className="w-full">Book Consultation</Button>
                </Link>
            </div>
        </article>
    )
}

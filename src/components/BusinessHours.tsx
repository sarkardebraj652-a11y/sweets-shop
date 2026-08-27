import React, { useMemo } from 'react';
import { Clock, AlertCircle, CheckCircle, Phone } from 'lucide-react';
import { BUSINESS_HOURS, BUSINESS_INFO } from '../data/businessData';

export const BusinessHours: React.FC = () => {
  // Determine current day of week and open/closed status
  const currentStatus = useMemo(() => {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayName = days[now.getDay()];
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTimeInMinutes = hours * 60 + minutes;

    // 6:30 AM is 390 minutes
    const openTimeInMinutes = 6 * 60 + 30;
    // Sun closes at 12:30 PM (750 mins), other days at 12:00 PM (720 mins)
    const closeTimeInMinutes = currentDayName === 'Sunday' ? 12 * 60 + 30 : 12 * 60;

    const isOpen = currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes;

    return {
      todayName: currentDayName,
      isOpen,
      openTimeStr: '6:30 AM',
      closeTimeStr: currentDayName === 'Sunday' ? '12:30 PM' : '12:00 PM',
    };
  }, []);

  return (
    <section id="hours" className="py-16 md:py-24 bg-[#FCF9F2] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B1D24]/10 text-[#8B1D24] text-xs font-bold uppercase tracking-wider mb-3">
            <Clock className="w-3.5 h-3.5 text-[#D97706]" />
            Operating Schedule
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#8B1D24] tracking-tight">
            Business Hours
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#614736]">
            Morning service for fresh sweets, breakfast snacks, and day-start treats.
          </p>
          <div className="w-16 h-1 bg-[#D97706] mx-auto mt-4 rounded-full" />
        </div>

        {/* Live Status Badge Card */}
        <div className="bg-[#FAF3E8] border border-[#E8D7C4] rounded-3xl p-6 sm:p-8 mb-8 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3.5">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  currentStatus.isOpen
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {currentStatus.isOpen ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <Clock className="w-6 h-6" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <span
                    className={`inline-block w-2.5 h-2.5 rounded-full ${
                      currentStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                    }`}
                  />
                  <h3 className="font-serif text-xl font-bold text-[#2D1B14]">
                    {currentStatus.isOpen ? 'Open Right Now' : 'Currently Closed'}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#7A5E4D] mt-0.5">
                  Today ({currentStatus.todayName}): 6:30 AM – {currentStatus.closeTimeStr}
                </p>
              </div>
            </div>

            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              id="hours-call-check-btn"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B1D24] text-white text-xs sm:text-sm font-bold shadow hover:bg-[#6e141a] transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call Before Visiting: {BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>

        {/* Weekly Hours Table */}
        <div className="bg-white rounded-3xl border border-[#ECDCCB] shadow-sm overflow-hidden mb-8">
          <div className="divide-y divide-[#F2E5D5]">
            {BUSINESS_HOURS.map((item) => {
              const isToday = item.day === currentStatus.todayName;
              return (
                <div
                  key={item.day}
                  className={`flex items-center justify-between p-4 sm:px-8 sm:py-4.5 transition-colors ${
                    isToday ? 'bg-[#FFF7EC] font-bold' : 'hover:bg-[#FCFAF5]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-sm sm:text-base ${
                        isToday ? 'text-[#8B1D24] font-bold' : 'text-[#3E281C]'
                      }`}
                    >
                      {item.day}
                    </span>
                    {isToday && (
                      <span className="text-[10px] bg-[#8B1D24] text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        Today
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-sm sm:text-base ${
                      isToday ? 'text-[#8B1D24] font-bold' : 'text-[#5E4232]'
                    }`}
                  >
                    {item.hours}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Disclaimer / Notice as required by prompt */}
        <div className="bg-[#FAF3E7] p-4 sm:p-5 rounded-2xl border border-[#E9D9C7] flex items-start gap-3 text-xs sm:text-sm text-[#664B3B]">
          <AlertCircle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Listing Notice:</strong> These timings represent the currently supplied Google listing hours for Gopal Sweets. Timings during special festival days (such as Diwali, Durga Puja, or Bengali New Year) may differ. Customers are advised to contact the shop by phone to verify exact holiday or evening availability.
          </p>
        </div>

      </div>
    </section>
  );
};

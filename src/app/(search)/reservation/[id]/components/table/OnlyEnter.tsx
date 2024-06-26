import Image from 'next/image';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  seatListReservation,
  selectedSeatAllState,
  confirmedState,
  infoMsgState,
} from '@/app/(search)/atom/office';
import { useFormatDate } from '@/app/(search)/map/hooks/useFormatDate';

export default function OnlyEnter() {
  const [selectedSeatAll, setSelectedSeatAll] =
    useRecoilState(selectedSeatAllState);

  const handleSeatClick = (seatNumber: string) => {
    setSelectedSeatAll((prev) => ({
      ...prev,
      code: seatNumber,
      start_date: prev?.start_date || '',
      end_date: prev?.end_date || '',
      type: prev?.type || '',
    }));
  };

  //기업 전용 지정 좌석
  return (
    <>
      <div className="hidden-360 flex flex-col justify-end w-[61.8125rem] h-[51.25rem] relative overflow-hidden rounded-md">
        <div className="absolute inset-0">
          <Image
            src="/images/office/1.jpeg"
            layout="fill"
            objectFit="cover"
            alt="오피스이미지"
          />
        </div>

        <div className="relative flex gap-4 h-[19.375rem]  bg-[#E4EEFF] p-8">
          <div className="flex flex-col gap-6 w-[44.5rem] h-[13rem]">
            <p className="text-[1.25rem] font-semibold">좌석 선택</p>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 40 }, (area, i) => i + 1).map((area, i) => {
                const seatNumber = `I-${String(area).padStart(2, '0')}`;
                return (
                  <div key={i}>
                    <button
                      onClick={() => handleSeatClick(seatNumber)}
                      className={`rounded-lg w-[4rem] h-[2.5rem] ${
                        selectedSeatAll?.code === seatNumber
                          ? 'bg-[#688AF2] text-white'
                          : 'bg-white'
                      }`}
                    >
                      {seatNumber}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-start">
            <p className="text-[1.25rem] font-semibold">예약 정보</p>
            <div className="flex flex-col gap-2 justify-between p-4 bg-white w-[12.3125rem] h-[13rem] rounded-lg">
              <div>
                <p className="text-[0.75rem] text-gray-300">날짜</p>
                <p className="text-sm">
                  {useFormatDate(selectedSeatAll?.start_date!)} -
                  {useFormatDate(selectedSeatAll?.end_date!)}
                </p>
                <div className="flex flex-col gap-3">
                  <div className="pr-2 border-gray-300">
                    <p className="text-[0.75rem] text-gray-300">좌석유형</p>
                    <p className="">{selectedSeatAll?.type}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

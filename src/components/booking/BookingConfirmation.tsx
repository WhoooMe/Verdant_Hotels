import { Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";

interface Props {
  room: any;
  formData: any;
}

export function BookingConfirmationLuxury({ room, formData }: Props) {
  const { t } = useLanguage();
  return (
    <div className="bg-card rounded-2xl border border-border shadow-[0_20px_40px_rgba(0,0,0,0.06)] p-10">
      {/* Title */}
      <div className="mb-8">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">
          t{"booking.confirmationTitle"}
        </p>
        <h3 className="font-serif text-3xl text-foreground">
          t{"booking.confirmationSubtitle"}
        </h3>
      </div>

      {/* Room Summary */}
      <div className="flex gap-6 pb-8 mb-8 border-b border-border">
        <div className="w-40 aspect-[4/3] rounded-xl overflow-hidden">
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-2">
          <h4 className="font-serif text-xl">{room.name}</h4>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Calendar className="w-4 h-4" />
            {formData.checkIn} — {formData.checkOut}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Users className="w-4 h-4" />
            <span>
              {formData.guests} t("confirm.guestsC")
              {formData.children > 0 && (
                <>
                  <span className="mx-2">•</span>
                  {formData.children} t("confirm.childrenC")
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Guest & Stay Info */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div>
          <p className="text-sm text-muted-foreground mb-1">
            t("confirm.guests")
          </p>
          <p className="text-foreground">
            {formData.firstName} {formData.lastName}
          </p>
          <p className="text-muted-foreground text-sm">{formData.email}</p>
          <p className="text-muted-foreground text-sm">{formData.phone}</p>
        </div>

        <div className="bg-secondary rounded-xl p-6 text-center">
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
            Total Payment
          </p>
          <p className="font-serif text-4xl text-primary">${room.price}</p>
          <p className="text-xs text-muted-foreground mt-2">
            t{"confirm.perStay"}
          </p>
        </div>
      </div>

      {/* Trust Note */}
      <p className="text-center text-xs text-muted-foreground mb-6">
        t{"booking.confirmationTrustNote"}
      </p>

      {/* CTA */}
      <Button
        type="submit"
        variant="luxury"
        size="xl"
        className="w-full h-14 rounded-xl text-lg"
      >
        t{"booking.confirmationCTA"}
      </Button>
    </div>
  );
}

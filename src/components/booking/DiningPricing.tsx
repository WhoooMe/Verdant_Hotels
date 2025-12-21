import { useLanguage } from "@/contexts/LanguageContext";
export const DiningPricing = () => {
  const { t } = useLanguage();
  return (
    <div className="rounded-xl border bg-[#FAF7F2] p-6">
      <h4 className="font-serif text-lg mb-3">{t("dining.pricing")}</h4>

      <div className="flex justify-between text-sm mb-2">
        <span>{t("dining.PAdults")}</span>
        <span>$45 / IDR 697.500</span>
      </div>

      <div className="flex justify-between text-sm mb-2">
        <span>{t("dining.PChildren")}</span>
        <span>$10 / IDR 155.000</span>
      </div>

      <p className="text-xs text-muted-foreground mt-3">
        {t("dining.PChildrenComplemen")}
      </p>
    </div>
  );
};

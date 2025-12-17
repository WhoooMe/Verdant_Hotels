import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Maximize2,
  Users,
  Wifi,
  Wind,
  Coffee,
  Bath,
} from "lucide-react";
import roomSuite from "@/assets/room-suite.jpg";
import roomDeluxe from "@/assets/room-deluxe.jpg";

const rooms = [
  {
    id: "jungle-suite",
    name: "Jungle Suite",
    nameId: "Suite Hutan",
    description:
      "Expansive living with panoramic jungle views, private terrace, and outdoor rain shower. Perfect for those seeking the ultimate tropical retreat.",
    descriptionId:
      "Ruang tamu luas dengan pemandangan hutan panorama, teras pribadi, dan shower hujan outdoor. Sempurna untuk mereka yang mencari peristirahatan tropis terbaik.",
    image: roomSuite,
    size: "85 m²",
    price: 450,
    capacity: "2-3 guests",
    amenities: ["King Bed", "Private Pool", "Rain Shower", "Mini Bar", "Wi-Fi"],
  },
  {
    id: "canopy-room",
    name: "Canopy Room",
    nameId: "Kamar Kanopi",
    description:
      "Intimate retreat surrounded by tropical canopy, featuring floor-to-ceiling windows that blur the boundary between indoor and outdoor living.",
    descriptionId:
      "Tempat peristirahatan intim yang dikelilingi kanopi tropis, dengan jendela dari lantai hingga langit-langit yang mengaburkan batas antara ruang dalam dan luar.",
    image: roomDeluxe,
    size: "55 m²",
    price: 320,
    capacity: "2 guests",
    amenities: ["King Bed", "Garden View", "Rain Shower", "Mini Bar", "Wi-Fi"],
  },
  {
    id: "garden-villa",
    name: "Garden Villa",
    nameId: "Vila Taman",
    description:
      "Secluded villa with private garden, outdoor bathtub, and dedicated butler service. An exclusive sanctuary for discerning travelers.",
    descriptionId:
      "Vila terpencil dengan taman pribadi, bathtub outdoor, dan layanan butler khusus. Tempat perlindungan eksklusif untuk pelancong yang cerdas.",
    image: roomSuite,
    size: "120 m²",
    price: 750,
    capacity: "2-4 guests",
    amenities: [
      "King Bed",
      "Private Pool",
      "Outdoor Bath",
      "Butler Service",
      "Wi-Fi",
    ],
  },
];

const amenityIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  "King Bed": Bath,
  "Private Pool": Bath,
  "Rain Shower": Bath,
  "Mini Bar": Coffee,
  "Wi-Fi": Wifi,
  "Garden View": Maximize2,
  "Outdoor Bath": Bath,
  "Butler Service": Users,
};

function RoomsContent() {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-secondary">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">
              {t("rooms.subtitle")}
            </p>
            <h1 className="font-serif text-4xl md:text-6xl text-foreground mb-6">
              {t("rooms.title")}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t("rooms.description")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Rooms List */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="space-y-24">
            {rooms.map((room, index) => (
              <ScrollReveal key={room.id}>
                <div
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image */}
                  <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                      <img
                        src={room.image}
                        alt={language === "en" ? room.name : room.nameId}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full">
                        <span className="text-sm font-medium text-primary">
                          {room.size}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                      {language === "en" ? room.name : room.nameId}
                    </h2>

                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{room.capacity}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Maximize2 className="w-4 h-4" />
                        <span className="text-sm">{room.size}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                      {language === "en"
                        ? room.description
                        : room.descriptionId}
                    </p>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-3 mb-8">
                      {room.amenities.map((amenity) => {
                        const Icon = amenityIcons[amenity] || Wind;
                        return (
                          <div
                            key={amenity}
                            className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-full text-sm text-muted-foreground"
                          >
                            <Icon className="w-4 h-4" />
                            {amenity}
                          </div>
                        );
                      })}
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {t("rooms.from")}
                        </p>
                        <p className="font-serif text-3xl text-primary">
                          ${room.price}
                          <span className="text-base text-muted-foreground ml-2">
                            / {language === "en" ? "night" : "malam"}
                          </span>
                        </p>
                      </div>
                      <Button asChild variant="luxury" size="lg">
                        <Link to="/booking" className="flex items-center gap-2">
                          {t("nav.book")}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function Rooms() {
  return <RoomsContent />;
}

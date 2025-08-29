import { HotResponse, IcedResponse } from "@/shared/types";
import Image from "next/image";
import styles from "./coffee-card.module.css";
import { useState } from "react";

interface IProps {
  card: HotResponse | IcedResponse;
}

export const CoffeeCard: React.FC<IProps> = (props) => {
  const { card } = props;
  const { title, description, image, ingredients } = card;
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {isImageLoading && (
          <div className={styles.skeleton}>
            <div className={styles.skeletonPulse}></div>
          </div>
        )}
        <Image
          loading="lazy"
          src={image}
          alt={title}
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
            opacity: isImageLoading ? 0 : 1,
            transition: "opacity 0.3s ease-in-out",
          }}
          onLoad={() => setIsImageLoading(false)}
          onError={() => setIsImageLoading(false)}
        />
      </div>

      <div className={styles.titleContainer}>
        <h3 className={styles.title}>{title}</h3>
      </div>

      {ingredients && ingredients.length > 0 && (
        <div className={styles.ingredientsContainer}>
          <div className={styles.ingredientsList}>
            {ingredients.map((ingredient, index) => (
              <span key={index} className={styles.ingredient}>
                {ingredient}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className={styles.descriptionContainer}>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

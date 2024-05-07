import * as Dialog from "@radix-ui/react-dialog";
import styles from "./Gallery.module.css";

interface GalleryProps {
  imageList: Array<string>;
}

const Gallery = ({ imageList }: GalleryProps) => {
  return (
    <>
      <div className="flex flex-wrap justify-center gap-4">
        {imageList.map((imageURL) => (
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button>
                <img
                  key={imageURL}
                  className="w-auto sm:h-[250px] h-[110px] rounded-md hover:scale-105 transition-transform delay-100 cursor-pointer"
                  src={imageURL}
                  draggable={false}
                  alt="Image of workplace"
                />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className={styles.DialogOverlay} />
              <Dialog.Content className={styles.DialogContent}>
                <Dialog.Description className={styles.DialogDescription}>
                  <img
                    key={imageURL}
                    className="w-[800px]"
                    src={imageURL}
                    draggable={false}
                    alt="Image of workplace"
                  />
                </Dialog.Description>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        ))}
      </div>
    </>
  );
};

export default Gallery;

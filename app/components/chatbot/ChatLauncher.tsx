import Image, { type StaticImageData } from "next/image";
import styles from "./chatbot.module.css";
import type { ChatLabels } from "./types";

type Props = {
  labels: ChatLabels;
  avatar: StaticImageData;
  /** Mostra o balão de boas-vindas e o badge "1". */
  showHints: boolean;
  onOpen: () => void;
};

export default function ChatLauncher({ labels, avatar, showHints, onOpen }: Props) {
  return (
    <>
      {showHints && (
        <button type="button" className={styles.welcomeBubble} onClick={onOpen}>
          {labels.welcomeBubble}
        </button>
      )}
      <button
        type="button"
        className={styles.launcher}
        onClick={onOpen}
        aria-label={labels.open}
      >
        <span className={styles.launcherAvatarWrapper}>
          <Image src={avatar} alt="" width={48} height={48} className={styles.launcherAvatar} />
          {showHints && <span className={styles.badge}>1</span>}
        </span>
      </button>
    </>
  );
}

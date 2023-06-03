import type { QwikChangeEvent } from "@builder.io/qwik";
import { $, component$, useSignal } from "@builder.io/qwik";

export const PhotoUpload = component$(() => {
  const imagePreviewUrl = useSignal<string>();

  const fileInputRef = useSignal<HTMLElement>();

  const handleImageChange = $((e: QwikChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    const file = e.target?.files?.[0];

    if (!file) {
      return;
    }

    reader.onloadend = () => {
      imagePreviewUrl.value = reader.result as string;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  });

  const handleClick = $(() => {
    if (!fileInputRef.value) {
      return;
    }
    fileInputRef.value.click();
  });

  return (
    <div class="grid justify-start">
      {imagePreviewUrl.value ? (
        <img
          src={imagePreviewUrl.value}
          alt="preview"
          width={400}
          height={400}
        />
      ) : (
        <button type="button" class="text-4xl" onClick$={handleClick}>
          Take Photo📷
        </button>
      )}
      <input
        type="file"
        name="photo"
        ref={fileInputRef}
        onChange$={handleImageChange}
        accept="image/*"
        style={{ opacity: 0 }}
        capture
        required
      />
    </div>
  );
});

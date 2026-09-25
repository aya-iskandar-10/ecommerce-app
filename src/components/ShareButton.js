import { useToast } from '../context/ToastContext';

export function ShareButton({ product }) {
  const { showToast } = useToast();

  async function handleShare() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, text: product.name, url });
        return;
      }

      await navigator.clipboard.writeText(url);
      showToast('Link copied successfully', 'success');
    } catch (error) {
      showToast('We could not share this product', 'error');
    }
  }

  return <button className="icon-action share-button" type="button" onClick={handleShare} aria-label="Share" title="Share product"><span aria-hidden="true">↗</span></button>;
}
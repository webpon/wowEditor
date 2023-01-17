import useStoreConfig from "@/store/modules/config";
const storeConfig = useStoreConfig()

export const useBackToTop = (_this) => {
    document.getElementsByClassName('vditor-wysiwyg')[0]?.addEventListener('scroll', (e: any) => {
        _this.showBacktoTop = e.target.scrollTop >= 800
    });
    document.getElementsByClassName('vditor-preview')[0]?.addEventListener('scroll', (e: any) => {
        _this.showBacktoTop = e.target.scrollTop >= 800
    });
}
export const toTop = () => {
    document.querySelector(`.vditor-${storeConfig.mode}`).scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}
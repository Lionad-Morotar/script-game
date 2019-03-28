export default function checkDataUpdateFlag (option) {
  return WrappedComponent => {
    return class WishShare extends WrappedComponent {
      onShareAppMessage () {
        const shareInfo = super.onShareAppMessage
          ? super.onShareAppMessage()
          : {}
        return Object.assign(
          {
            title: "分享",
            path: "pages/index/index",
          },
          option,
          shareInfo,
        )
      }
    }
  }
}

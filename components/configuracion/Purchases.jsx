import { Pressable, Platform } from 'react-native';
import { requestPurchase, requestSubscription } from 'react-native-iap';

export const Purchases = () => {
  const purchase = async (sku) => {
    try {
      await requestPurchase({
        sku,
        andDangerouslyFinishTransactionAutomaticallyIOS: false,
      });
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  const subscribe = async (sku, offerToken = null) => {
    try {
      await requestSubscription({
        sku,
        ...(offerToken && { subscriptionOffers: [{ sku, offerToken }] }),
      });
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  const renderPurchaseButton = (product) => (
    <Pressable onPress={() => purchase(product.productId)}>
      {/* ... */}
    </Pressable>
  );

  const renderSubscriptionButton = (product) => {
    if (Platform.OS === 'android') {
      return product.subscriptionOfferDetails.map((offer) => (
        <Pressable
          key={offer.offerToken}
          onPress={() => subscribe(product.productId, offer.offerToken)}
        >
          {/* ... */}
        </Pressable>
      ));
    } else {
      return (
        <Pressable onPress={() => subscribe(product.productId, null)}>
          {/* ... */}
        </Pressable>
      );
    }
  };

  return (
    <>
      {/* Render one-time purchase button */}
      {renderPurchaseButton(product)}

      {/* Render subscription button */}
      {renderSubscriptionButton(product)}
    </>
  );
};


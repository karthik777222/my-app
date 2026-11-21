import User from "../models/User.js";

// GET CART
export const getCart = async (req, res) => {
  try {
  const user = await User.findById(req.user.id);
if (!user.cartData) {
  user.cartData = {};
}


    res.json({
      success: true,
      cartData: user.cartData || {}
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const user = await User.findById(req.user.id);

    if (!user.cartData) {
      user.cartData = {};
    }

    const currentQuantity =
      user.cartData[productId] || 0;

    user.cartData[productId] =
      currentQuantity + 1;

    user.markModified("cartData");

    await user.save();

    res.json({
      success: true,
      message: "Product added to cart",
      cartData: user.cartData
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// REMOVE FROM CART
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const user = await User.findById(req.user.id);

    if (
      user.cartData &&
      user.cartData[productId]
    ) {
      if (user.cartData[productId] > 1) {
        user.cartData[productId]--;
      } else {
        delete user.cartData[productId];
      }
    }

    user.markModified("cartData");

    await user.save();

    res.json({
      success: true,
      message: "Cart updated",
      cartData: user.cartData
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

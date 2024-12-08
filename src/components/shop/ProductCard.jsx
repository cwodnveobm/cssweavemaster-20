import React from 'react';
import { ShoppingCart, Heart, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCart } from '../../context/CartContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ProductCard = ({ product }) => {
  const { addToCart, savedItems, saveForLater } = useCart();
  const isSaved = savedItems.some(item => item.id === product.id);

  const handleSaveForLater = () => {
    saveForLater(product);
    toast.success(`${product.name} ${isSaved ? 'removed from' : 'added to'} favorites`);
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-[450px]">
      <div className="relative aspect-square w-full overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-green-800 line-clamp-2">{product.name}</h3>
          <span className="text-green-800 font-bold whitespace-nowrap ml-2">₹{product.price}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
        <div className="flex flex-col gap-2 mt-auto">
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={handleSaveForLater}
              className={`w-12 h-12 rounded-lg border-2 border-green-800 ${
                isSaved ? 'bg-green-50' : 'bg-white hover:bg-green-50'
              }`}
            >
              <Heart 
                className={`w-5 h-5 ${
                  isSaved ? 'text-green-600 fill-green-600' : 'text-green-800'
                }`} 
                fill={isSaved ? "currentColor" : "none"}
              />
            </Button>
            <Button 
              onClick={handleAddToCart}
              className="flex-1 bg-green-800 hover:bg-green-700 text-white rounded-lg h-12 flex items-center justify-between px-4"
            >
              <span className="text-base font-medium">Add to Bag</span>
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 text-green-800 border-green-800"
              >
                <Info className="w-4 h-4" />
                Additional Info
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-green-800 mb-4">
                  {product.name} - Additional Information
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-green-700 mb-2">Product Details</h4>
                  <p className="text-gray-600">{product.description}</p>
                </div>
                <div>
                  <h4 className="font-medium text-green-700 mb-2">Usage Instructions</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Follow package instructions carefully</li>
                    <li>Store in a cool, dry place</li>
                    <li>Keep away from direct sunlight</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-green-700 mb-2">Ingredients</h4>
                  <p className="text-gray-600">100% Natural Henna, Essential Oils</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
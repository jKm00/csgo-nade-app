��e x p o r t   t y p e   J s o n   =  
     |   s t r i n g  
     |   n u m b e r  
     |   b o o l e a n  
     |   n u l l  
     |   {   [ k e y :   s t r i n g ] :   J s o n   }  
     |   J s o n [ ]  
  
 e x p o r t   i n t e r f a c e   D a t a b a s e   {  
     g r a p h q l _ p u b l i c :   {  
         T a b l e s :   {  
             [ _   i n   n e v e r ] :   n e v e r  
         }  
         V i e w s :   {  
             [ _   i n   n e v e r ] :   n e v e r  
         }  
         F u n c t i o n s :   {  
             g r a p h q l :   {  
                 A r g s :   {  
                     o p e r a t i o n N a m e ? :   s t r i n g  
                     q u e r y ? :   s t r i n g  
                     v a r i a b l e s ? :   J s o n  
                     e x t e n s i o n s ? :   J s o n  
                 }  
                 R e t u r n s :   J s o n  
             }  
         }  
         E n u m s :   {  
             [ _   i n   n e v e r ] :   n e v e r  
         }  
         C o m p o s i t e T y p e s :   {  
             [ _   i n   n e v e r ] :   n e v e r  
         }  
     }  
     p u b l i c :   {  
         T a b l e s :   {  
             b u g _ r e p o r t s :   {  
                 R o w :   {  
                     c r e a t e d _ a t :   s t r i n g   |   n u l l  
                     d e s c r i p t i o n :   s t r i n g  
                     i d :   n u m b e r  
                     t i t l e :   s t r i n g  
                     u s e r _ i d :   n u m b e r   |   n u l l  
                 }  
                 I n s e r t :   {  
                     c r e a t e d _ a t ? :   s t r i n g   |   n u l l  
                     d e s c r i p t i o n :   s t r i n g  
                     i d ? :   n u m b e r  
                     t i t l e :   s t r i n g  
                     u s e r _ i d ? :   n u m b e r   |   n u l l  
                 }  
                 U p d a t e :   {  
                     c r e a t e d _ a t ? :   s t r i n g   |   n u l l  
                     d e s c r i p t i o n ? :   s t r i n g  
                     i d ? :   n u m b e r  
                     t i t l e ? :   s t r i n g  
                     u s e r _ i d ? :   n u m b e r   |   n u l l  
                 }  
             }  
             m a p s :   {  
                 R o w :   {  
                     c r e a t e d _ a t :   s t r i n g   |   n u l l  
                     i d :   n u m b e r  
                     n a m e :   s t r i n g  
                     r a d a r :   s t r i n g  
                     t h u m b n a i l :   s t r i n g  
                 }  
                 I n s e r t :   {  
                     c r e a t e d _ a t ? :   s t r i n g   |   n u l l  
                     i d ? :   n u m b e r  
                     n a m e :   s t r i n g  
                     r a d a r :   s t r i n g  
                     t h u m b n a i l :   s t r i n g  
                 }  
                 U p d a t e :   {  
                     c r e a t e d _ a t ? :   s t r i n g   |   n u l l  
                     i d ? :   n u m b e r  
                     n a m e ? :   s t r i n g  
                     r a d a r ? :   s t r i n g  
                     t h u m b n a i l ? :   s t r i n g  
                 }  
             }  
             n a d e s :   {  
                 R o w :   {  
                     c r e a t e d _ a t :   s t r i n g   |   n u l l  
                     i d :   n u m b e r  
                     i m p a c t _ i m g :   s t r i n g   |   n u l l  
                     i m p a c t _ x :   n u m b e r  
                     i m p a c t _ y :   n u m b e r  
                     l i n e u p _ i m g :   s t r i n g   |   n u l l  
                     l i n e u p _ x :   n u m b e r  
                     l i n e u p _ y :   n u m b e r  
                     n a m e :   s t r i n g  
                     n o t e s :   s t r i n g   |   n u l l  
                     s t r a t _ i d :   n u m b e r  
                     t y p e :   s t r i n g  
                 }  
                 I n s e r t :   {  
                     c r e a t e d _ a t ? :   s t r i n g   |   n u l l  
                     i d ? :   n u m b e r  
                     i m p a c t _ i m g ? :   s t r i n g   |   n u l l  
                     i m p a c t _ x :   n u m b e r  
                     i m p a c t _ y :   n u m b e r  
                     l i n e u p _ i m g ? :   s t r i n g   |   n u l l  
                     l i n e u p _ x :   n u m b e r  
                     l i n e u p _ y :   n u m b e r  
                     n a m e :   s t r i n g  
                     n o t e s ? :   s t r i n g   |   n u l l  
                     s t r a t _ i d :   n u m b e r  
                     t y p e :   s t r i n g  
                 }  
                 U p d a t e :   {  
                     c r e a t e d _ a t ? :   s t r i n g   |   n u l l  
                     i d ? :   n u m b e r  
                     i m p a c t _ i m g ? :   s t r i n g   |   n u l l  
                     i m p a c t _ x ? :   n u m b e r  
                     i m p a c t _ y ? :   n u m b e r  
                     l i n e u p _ i m g ? :   s t r i n g   |   n u l l  
                     l i n e u p _ x ? :   n u m b e r  
                     l i n e u p _ y ? :   n u m b e r  
                     n a m e ? :   s t r i n g  
                     n o t e s ? :   s t r i n g   |   n u l l  
                     s t r a t _ i d ? :   n u m b e r  
                     t y p e ? :   s t r i n g  
                 }  
             }  
             p o s i t i o n s :   {  
                 R o w :   {  
                     c r e a t e d _ a t :   s t r i n g   |   n u l l  
                     i d :   n u m b e r  
                     i m g :   s t r i n g  
                     m a p _ i d :   n u m b e r  
                     n a m e :   s t r i n g  
                 }  
                 I n s e r t :   {  
                     c r e a t e d _ a t ? :   s t r i n g   |   n u l l  
                     i d ? :   n u m b e r  
                     i m g :   s t r i n g  
                     m a p _ i d :   n u m b e r  
                     n a m e :   s t r i n g  
                 }  
                 U p d a t e :   {  
                     c r e a t e d _ a t ? :   s t r i n g   |   n u l l  
                     i d ? :   n u m b e r  
                     i m g ? :   s t r i n g  
                     m a p _ i d ? :   n u m b e r  
                     n a m e ? :   s t r i n g  
                 }  
             }  
             p r o f i l e _ p i c t u r e s :   {  
                 R o w :   {  
                     c r e a t e d _ a t :   s t r i n g   |   n u l l  
                     f i l e n a m e :   s t r i n g  
                     i d :   n u m b e r  
                 }  
                 I n s e r t :   {  
                     c r e a t e d _ a t ? :   s t r i n g   |   n u l l  
                     f i l e n a m e :   s t r i n g  
                     i d ? :   n u m b e r  
                 }  
                 U p d a t e :   {  
                     c r e a t e d _ a t ? :   s t r i n g   |   n u l l  
                     f i l e n a m e ? :   s t r i n g  
                     i d ? :   n u m b e r  
                 }  
             }  
             p r o f i l e s :   {  
                 R o w :   {  
                     e m a i l :   s t r i n g  
                     i d :   n u m b e r  
                     i n s e r t e d _ a t :   s t r i n g  
                     n a m e :   s t r i n g  
                     p r o f i l e _ p i c t u r e :   n u m b e r  
                     u p d a t e d _ a t :   s t r i n g  
                     u s e r n a m e :   s t r i n g  
                     u u i d :   s t r i n g  
                 }  
                 I n s e r t :   {  
                     e m a i l :   s t r i n g  
                     i d ? :   n u m b e r  
                     i n s e r t e d _ a t ? :   s t r i n g  
                     n a m e :   s t r i n g  
                     p r o f i l e _ p i c t u r e ? :   n u m b e r  
                     u p d a t e d _ a t ? :   s t r i n g  
                     u s e r n a m e :   s t r i n g  
                     u u i d :   s t r i n g  
                 }  
                 U p d a t e :   {  
                     e m a i l ? :   s t r i n g  
                     i d ? :   n u m b e r  
                     i n s e r t e d _ a t ? :   s t r i n g  
                     n a m e ? :   s t r i n g  
                     p r o f i l e _ p i c t u r e ? :   n u m b e r  
                     u p d a t e d _ a t ? :   s t r i n g  
                     u s e r n a m e ? :   s t r i n g  
                     u u i d ? :   s t r i n g  
                 }  
             }  
             p r o f i l e s _ b a c k u p :   {  
                 R o w :   {  
                     e m a i l :   s t r i n g   |   n u l l  
                     i d :   n u m b e r   |   n u l l  
                     i n s e r t e d _ a t :   s t r i n g   |   n u l l  
                     n a m e :   s t r i n g   |   n u l l  
                     p r o f i l e _ p i c t u r e :   n u m b e r   |   n u l l  
                     u p d a t e d _ a t :   s t r i n g   |   n u l l  
                     u s e r n a m e :   s t r i n g   |   n u l l  
                     u u i d :   s t r i n g   |   n u l l  
                 }  
                 I n s e r t :   {  
                     e m a i l ? :   s t r i n g   |   n u l l  
                     i d ? :   n u m b e r   |   n u l l  
                     i n s e r t e d _ a t ? :   s t r i n g   |   n u l l  
                     n a m e ? :   s t r i n g   |   n u l l  
                     p r o f i l e _ p i c t u r e ? :   n u m b e r   |   n u l l  
                     u p d a t e d _ a t ? :   s t r i n g   |   n u l l  
                     u s e r n a m e ? :   s t r i n g   |   n u l l  
                     u u i d ? :   s t r i n g   |   n u l l  
                 }  
                 U p d a t e :   {  
                     e m a i l ? :   s t r i n g   |   n u l l  
                     i d ? :   n u m b e r   |   n u l l  
                     i n s e r t e d _ a t ? :   s t r i n g   |   n u l l  
                     n a m e ? :   s t r i n g   |   n u l l  
                     p r o f i l e _ p i c t u r e ? :   n u m b e r   |   n u l l  
                     u p d a t e d _ a t ? :   s t r i n g   |   n u l l  
                     u s e r n a m e ? :   s t r i n g   |   n u l l  
                     u u i d ? :   s t r i n g   |   n u l l  
                 }  
             }  
             r o l e s :   {  
                 R o w :   {  
                     i d :   n u m b e r  
                     n a m e :   s t r i n g  
                 }  
                 I n s e r t :   {  
                     i d ? :   n u m b e r  
                     n a m e ? :   s t r i n g  
                 }  
                 U p d a t e :   {  
                     i d ? :   n u m b e r  
                     n a m e ? :   s t r i n g  
                 }  
             }  
             s t r a t s :   {  
                 R o w :   {  
                     a u t h o r _ i d :   n u m b e r  
                     d e s c r i p t i o n :   s t r i n g  
                     i d :   n u m b e r  
                     i n s e r t e d _ a t :   s t r i n g  
                     m a p _ i d :   n u m b e r  
                     n a m e :   s t r i n g  
                     p o s i t i o n _ i d :   n u m b e r   |   n u l l  
                     p r i v a c y :   s t r i n g  
                     t e a m _ i d :   n u m b e r   |   n u l l  
                     t e a m _ s i d e :   s t r i n g  
                     u p d a t e d _ a t :   s t r i n g  
                 }  
                 I n s e r t :   {  
                     a u t h o r _ i d :   n u m b e r  
                     d e s c r i p t i o n :   s t r i n g  
                     i d ? :   n u m b e r  
                     i n s e r t e d _ a t ? :   s t r i n g  
                     m a p _ i d :   n u m b e r  
                     n a m e :   s t r i n g  
                     p o s i t i o n _ i d ? :   n u m b e r   |   n u l l  
                     p r i v a c y :   s t r i n g  
                     t e a m _ i d ? :   n u m b e r   |   n u l l  
                     t e a m _ s i d e ? :   s t r i n g  
                     u p d a t e d _ a t ? :   s t r i n g  
                 }  
                 U p d a t e :   {  
                     a u t h o r _ i d ? :   n u m b e r  
                     d e s c r i p t i o n ? :   s t r i n g  
                     i d ? :   n u m b e r  
                     i n s e r t e d _ a t ? :   s t r i n g  
                     m a p _ i d ? :   n u m b e r  
                     n a m e ? :   s t r i n g  
                     p o s i t i o n _ i d ? :   n u m b e r   |   n u l l  
                     p r i v a c y ? :   s t r i n g  
                     t e a m _ i d ? :   n u m b e r   |   n u l l  
                     t e a m _ s i d e ? :   s t r i n g  
                     u p d a t e d _ a t ? :   s t r i n g  
                 }  
             }  
             t e a m _ i n v i t a t i o n s :   {  
                 R o w :   {  
                     c r e a t e d _ a t :   s t r i n g   |   n u l l  
                     i d :   n u m b e r  
                     p l a y e r _ i d :   n u m b e r   |   n u l l  
                     t e a m _ i d :   n u m b e r   |   n u l l  
                     t e a m _ r o l e :   s t r i n g   |   n u l l  
                 }  
                 I n s e r t :   {  
                     c r e a t e d _ a t ? :   s t r i n g   |   n u l l  
                     i d ? :   n u m b e r  
                     p l a y e r _ i d ? :   n u m b e r   |   n u l l  
                     t e a m _ i d ? :   n u m b e r   |   n u l l  
                     t e a m _ r o l e ? :   s t r i n g   |   n u l l  
                 }  
                 U p d a t e :   {  
                     c r e a t e d _ a t ? :   s t r i n g   |   n u l l  
                     i d ? :   n u m b e r  
                     p l a y e r _ i d ? :   n u m b e r   |   n u l l  
                     t e a m _ i d ? :   n u m b e r   |   n u l l  
                     t e a m _ r o l e ? :   s t r i n g   |   n u l l  
                 }  
             }  
             t e a m _ m e m b e r s :   {  
                 R o w :   {  
                     i d :   n u m b e r  
                     i n s e r t e d _ a t :   s t r i n g  
                     p l a y e r _ i d :   n u m b e r  
                     r o l e :   s t r i n g   |   n u l l  
                     t e a m _ i d :   n u m b e r  
                     u p d a t e d _ a t :   s t r i n g  
                 }  
                 I n s e r t :   {  
                     i d ? :   n u m b e r  
                     i n s e r t e d _ a t ? :   s t r i n g  
                     p l a y e r _ i d :   n u m b e r  
                     r o l e ? :   s t r i n g   |   n u l l  
                     t e a m _ i d :   n u m b e r  
                     u p d a t e d _ a t ? :   s t r i n g  
                 }  
                 U p d a t e :   {  
                     i d ? :   n u m b e r  
                     i n s e r t e d _ a t ? :   s t r i n g  
                     p l a y e r _ i d ? :   n u m b e r  
                     r o l e ? :   s t r i n g   |   n u l l  
                     t e a m _ i d ? :   n u m b e r  
                     u p d a t e d _ a t ? :   s t r i n g  
                 }  
             }  
             t e a m s :   {  
                 R o w :   {  
                     c r e a t e d _ a t :   s t r i n g   |   n u l l  
                     i d :   n u m b e r  
                     n a m e :   s t r i n g  
                     o r g a n i z a t i o n :   s t r i n g   |   n u l l  
                     t e a m _ l e a d e r :   n u m b e r   |   n u l l  
                 }  
                 I n s e r t :   {  
                     c r e a t e d _ a t ? :   s t r i n g   |   n u l l  
                     i d ? :   n u m b e r  
                     n a m e :   s t r i n g  
                     o r g a n i z a t i o n ? :   s t r i n g   |   n u l l  
                     t e a m _ l e a d e r ? :   n u m b e r   |   n u l l  
                 }  
                 U p d a t e :   {  
                     c r e a t e d _ a t ? :   s t r i n g   |   n u l l  
                     i d ? :   n u m b e r  
                     n a m e ? :   s t r i n g  
                     o r g a n i z a t i o n ? :   s t r i n g   |   n u l l  
                     t e a m _ l e a d e r ? :   n u m b e r   |   n u l l  
                 }  
             }  
             u s e r _ r o l e s :   {  
                 R o w :   {  
                     i d :   n u m b e r  
                     r o l e _ i d :   n u m b e r  
                     u s e r _ i d :   n u m b e r  
                 }  
                 I n s e r t :   {  
                     i d ? :   n u m b e r  
                     r o l e _ i d :   n u m b e r  
                     u s e r _ i d :   n u m b e r  
                 }  
                 U p d a t e :   {  
                     i d ? :   n u m b e r  
                     r o l e _ i d ? :   n u m b e r  
                     u s e r _ i d ? :   n u m b e r  
                 }  
             }  
         }  
         V i e w s :   {  
             p r o f i l e _ t e a m s :   {  
                 R o w :   {  
                     j o i n e d _ a t :   s t r i n g   |   n u l l  
                     o r g :   s t r i n g   |   n u l l  
                     p l a y e r _ i d :   n u m b e r   |   n u l l  
                     p l a y e r _ r o l e :   s t r i n g   |   n u l l  
                     p r o f i l e _ u u i d :   s t r i n g   |   n u l l  
                     t e a m _ i d :   n u m b e r   |   n u l l  
                     t e a m _ n a m e :   s t r i n g   |   n u l l  
                     t o t a l _ p l a y e r s :   n u m b e r   |   n u l l  
                 }  
             }  
         }  
         F u n c t i o n s :   {  
             c h a n g e _ u s e r _ p a s s w o r d :   {  
                 A r g s :   {  
                     c u r r e n t _ p l a i n _ p a s s w o r d :   s t r i n g  
                     n e w _ p l a i n _ p a s s w o r d :   s t r i n g  
                 }  
                 R e t u r n s :   J s o n  
             }  
             g e t _ p r o f i l e s _ b y _ u s e r n a m e _ o r _ e m a i l :   {  
                 A r g s :   {  
                     i n p u t _ u s e r n a m e :   s t r i n g  
                     i n p u t _ e m a i l :   s t r i n g  
                 }  
                 R e t u r n s :   {  
                     e m a i l :   s t r i n g  
                     i d :   n u m b e r  
                     i n s e r t e d _ a t :   s t r i n g  
                     n a m e :   s t r i n g  
                     p r o f i l e _ p i c t u r e :   n u m b e r  
                     u p d a t e d _ a t :   s t r i n g  
                     u s e r n a m e :   s t r i n g  
                     u u i d :   s t r i n g  
                 } [ ]  
             }  
             i s _ s t r a t _ t e a m _ m e m b e r :   {  
                 A r g s :   {  
                     _ u s e r _ i d :   s t r i n g  
                     _ s t r a t _ i d :   n u m b e r  
                 }  
                 R e t u r n s :   b o o l e a n  
             }  
             q u e r y _ s t r a t s _ w i t h _ f i l t e r s :   {  
                 A r g s :   {  
                     p _ m a p :   s t r i n g  
                     p _ s t r a t _ p o s i t i o n :   s t r i n g  
                     p _ s i d e :   s t r i n g  
                     p _ s t r a t _ n a m e :   s t r i n g  
                     p _ t e a m _ n a m e :   s t r i n g  
                     p _ a u t h o r :   s t r i n g  
                 }  
                 R e t u r n s :   {  
                     s t r a t _ n a m e :   s t r i n g  
                     a u t h o r :   s t r i n g  
                     a u t h o r _ i d :   s t r i n g  
                     c r e a t e d _ a t :   s t r i n g  
                     t e a m :   s t r i n g  
                     s i d e :   s t r i n g  
                     p o s i t i o n _ n a m e :   s t r i n g  
                     p o s i t i o n _ i m g :   s t r i n g  
                     m a p _ n a m e :   s t r i n g  
                 } [ ]  
             }  
         }  
         E n u m s :   {  
             [ _   i n   n e v e r ] :   n e v e r  
         }  
         C o m p o s i t e T y p e s :   {  
             [ _   i n   n e v e r ] :   n e v e r  
         }  
     }  
     s t o r a g e :   {  
         T a b l e s :   {  
             b u c k e t s :   {  
                 R o w :   {  
                     a l l o w e d _ m i m e _ t y p e s :   s t r i n g [ ]   |   n u l l  
                     a v i f _ a u t o d e t e c t i o n :   b o o l e a n   |   n u l l  
                     c r e a t e d _ a t :   s t r i n g   |   n u l l  
                     f i l e _ s i z e _ l i m i t :   n u m b e r   |   n u l l  
                     i d :   s t r i n g  
                     n a m e :   s t r i n g  
                     o w n e r :   s t r i n g   |   n u l l  
                     p u b l i c :   b o o l e a n   |   n u l l  
                     u p d a t e d _ a t :   s t r i n g   |   n u l l  
                 }  
                 I n s e r t :   {  
                     a l l o w e d _ m i m e _ t y p e s ? :   s t r i n g [ ]   |   n u l l  
                     a v i f _ a u t o d e t e c t i o n ? :   b o o l e a n   |   n u l l  
                     c r e a t e d _ a t ? :   s t r i n g   |   n u l l  
                     f i l e _ s i z e _ l i m i t ? :   n u m b e r   |   n u l l  
                     i d :   s t r i n g  
                     n a m e :   s t r i n g  
                     o w n e r ? :   s t r i n g   |   n u l l  
                     p u b l i c ? :   b o o l e a n   |   n u l l  
                     u p d a t e d _ a t ? :   s t r i n g   |   n u l l  
                 }  
                 U p d a t e :   {  
                     a l l o w e d _ m i m e _ t y p e s ? :   s t r i n g [ ]   |   n u l l  
                     a v i f _ a u t o d e t e c t i o n ? :   b o o l e a n   |   n u l l  
                     c r e a t e d _ a t ? :   s t r i n g   |   n u l l  
                     f i l e _ s i z e _ l i m i t ? :   n u m b e r   |   n u l l  
                     i d ? :   s t r i n g  
                     n a m e ? :   s t r i n g  
                     o w n e r ? :   s t r i n g   |   n u l l  
                     p u b l i c ? :   b o o l e a n   |   n u l l  
                     u p d a t e d _ a t ? :   s t r i n g   |   n u l l  
                 }  
             }  
             m i g r a t i o n s :   {  
                 R o w :   {  
                     e x e c u t e d _ a t :   s t r i n g   |   n u l l  
                     h a s h :   s t r i n g  
                     i d :   n u m b e r  
                     n a m e :   s t r i n g  
                 }  
                 I n s e r t :   {  
                     e x e c u t e d _ a t ? :   s t r i n g   |   n u l l  
                     h a s h :   s t r i n g  
                     i d :   n u m b e r  
                     n a m e :   s t r i n g  
                 }  
                 U p d a t e :   {  
                     e x e c u t e d _ a t ? :   s t r i n g   |   n u l l  
                     h a s h ? :   s t r i n g  
                     i d ? :   n u m b e r  
                     n a m e ? :   s t r i n g  
                 }  
             }  
             o b j e c t s :   {  
                 R o w :   {  
                     b u c k e t _ i d :   s t r i n g   |   n u l l  
                     c r e a t e d _ a t :   s t r i n g   |   n u l l  
                     i d :   s t r i n g  
                     l a s t _ a c c e s s e d _ a t :   s t r i n g   |   n u l l  
                     m e t a d a t a :   J s o n   |   n u l l  
                     n a m e :   s t r i n g   |   n u l l  
                     o w n e r :   s t r i n g   |   n u l l  
                     p a t h _ t o k e n s :   s t r i n g [ ]   |   n u l l  
                     u p d a t e d _ a t :   s t r i n g   |   n u l l  
                     v e r s i o n :   s t r i n g   |   n u l l  
                 }  
                 I n s e r t :   {  
                     b u c k e t _ i d ? :   s t r i n g   |   n u l l  
                     c r e a t e d _ a t ? :   s t r i n g   |   n u l l  
                     i d ? :   s t r i n g  
                     l a s t _ a c c e s s e d _ a t ? :   s t r i n g   |   n u l l  
                     m e t a d a t a ? :   J s o n   |   n u l l  
                     n a m e ? :   s t r i n g   |   n u l l  
                     o w n e r ? :   s t r i n g   |   n u l l  
                     p a t h _ t o k e n s ? :   s t r i n g [ ]   |   n u l l  
                     u p d a t e d _ a t ? :   s t r i n g   |   n u l l  
                     v e r s i o n ? :   s t r i n g   |   n u l l  
                 }  
                 U p d a t e :   {  
                     b u c k e t _ i d ? :   s t r i n g   |   n u l l  
                     c r e a t e d _ a t ? :   s t r i n g   |   n u l l  
                     i d ? :   s t r i n g  
                     l a s t _ a c c e s s e d _ a t ? :   s t r i n g   |   n u l l  
                     m e t a d a t a ? :   J s o n   |   n u l l  
                     n a m e ? :   s t r i n g   |   n u l l  
                     o w n e r ? :   s t r i n g   |   n u l l  
                     p a t h _ t o k e n s ? :   s t r i n g [ ]   |   n u l l  
                     u p d a t e d _ a t ? :   s t r i n g   |   n u l l  
                     v e r s i o n ? :   s t r i n g   |   n u l l  
                 }  
             }  
         }  
         V i e w s :   {  
             [ _   i n   n e v e r ] :   n e v e r  
         }  
         F u n c t i o n s :   {  
             c a n _ i n s e r t _ o b j e c t :   {  
                 A r g s :   {  
                     b u c k e t i d :   s t r i n g  
                     n a m e :   s t r i n g  
                     o w n e r :   s t r i n g  
                     m e t a d a t a :   J s o n  
                 }  
                 R e t u r n s :   u n d e f i n e d  
             }  
             e x t e n s i o n :   {  
                 A r g s :   {  
                     n a m e :   s t r i n g  
                 }  
                 R e t u r n s :   s t r i n g  
             }  
             f i l e n a m e :   {  
                 A r g s :   {  
                     n a m e :   s t r i n g  
                 }  
                 R e t u r n s :   s t r i n g  
             }  
             f o l d e r n a m e :   {  
                 A r g s :   {  
                     n a m e :   s t r i n g  
                 }  
                 R e t u r n s :   s t r i n g [ ]  
             }  
             g e t _ s i z e _ b y _ b u c k e t :   {  
                 A r g s :   R e c o r d < P r o p e r t y K e y ,   n e v e r >  
                 R e t u r n s :   {  
                     s i z e :   n u m b e r  
                     b u c k e t _ i d :   s t r i n g  
                 } [ ]  
             }  
             s e a r c h :   {  
                 A r g s :   {  
                     p r e f i x :   s t r i n g  
                     b u c k e t n a m e :   s t r i n g  
                     l i m i t s ? :   n u m b e r  
                     l e v e l s ? :   n u m b e r  
                     o f f s e t s ? :   n u m b e r  
                     s e a r c h ? :   s t r i n g  
                     s o r t c o l u m n ? :   s t r i n g  
                     s o r t o r d e r ? :   s t r i n g  
                 }  
                 R e t u r n s :   {  
                     n a m e :   s t r i n g  
                     i d :   s t r i n g  
                     u p d a t e d _ a t :   s t r i n g  
                     c r e a t e d _ a t :   s t r i n g  
                     l a s t _ a c c e s s e d _ a t :   s t r i n g  
                     m e t a d a t a :   J s o n  
                 } [ ]  
             }  
         }  
         E n u m s :   {  
             [ _   i n   n e v e r ] :   n e v e r  
         }  
         C o m p o s i t e T y p e s :   {  
             [ _   i n   n e v e r ] :   n e v e r  
         }  
     }  
 }  
  
 
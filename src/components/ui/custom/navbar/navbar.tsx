'use client';
import CustomButton from '@/components/ui/custom/button/button';
import { supabase } from '@/lib/supabase';
import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  NavigationMenu,
  //NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  //NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

export const NavigationMenuDemo = () => {
  // State to handle form inputs
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
  });

  // State to handle loading state during submission
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      // Insert data into Supabase
      const { data, error } = await supabase
        .from('players') // Replace 'players' with your table name
        .insert([
          {
            nome: formData.nome,
            email: formData.email,
          },
        ])
        .select();

      if (error) throw error;

      // Clear form after successful submission
      setFormData({ nome: '', email: '' });

      // You might want to add a success notification here
      console.log('Player added successfully:', data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error adding player:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
      // You might want to add an error notification here
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="px-4 py-2">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/" className={navigationMenuTriggerStyle()}>
                Jogadores
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/nonstops" className={navigationMenuTriggerStyle()}>
                Nonstops
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Dialog>
          <DialogTrigger asChild>
            <CustomButton value="Adicionar jogador" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="pb-2">Adicionar Jogador</DialogTitle>
              {/* <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription> */}
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid w-full max-w-sm items-center gap-4">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-4">
                <Label htmlFor="username">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
                Adicionar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

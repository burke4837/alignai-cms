"use client";

import Link from "next/link";
import { CMSEditor } from "./cms/CMSEditor";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface CTASectionProps {
  title?: string;
  description?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
  isEditing?: boolean;
  onUpdate?: (field: string, value: string) => void;
}

export function CTASection({ 
  title = "Ready to understand what your AI is actually deciding?", 
  description = "No platform required. No prior governance work needed.",
  ctaButtonText = "Start a conversation →",
  ctaButtonLink = "/site/contact",
  isEditing = false,
  onUpdate
}: CTASectionProps) {
  const [editingField, setEditingField] = useState<string | null>(null);

  const buttonText = ctaButtonText;
  const buttonLink = ctaButtonLink;

  return (
    <section className="bg-deep-blue py-32" aria-label="Call to action">
      <div className="container-main text-center">
        {isEditing && editingField === 'title' ? (
          <div className="mb-4 max-w-4xl mx-auto">
            <CMSEditor 
              variant="ghost" 
              content={title} 
              onDone={() => setEditingField(null)}
              onChange={(val) => onUpdate?.('title', val)} 
            />
          </div>
        ) : (
          <h2 
            className={cn(
              "text-3xl font-bold text-white md:text-5xl font-heading mb-6",
              isEditing && "hover:ring-1 hover:ring-cyan/30 cursor-edit transition-all rounded px-2 opacity-80"
            )}
            onClick={() => isEditing && setEditingField('title')}
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}

        {isEditing && editingField === 'description' ? (
          <div className="mt-4 max-w-2xl mx-auto">
            <CMSEditor 
              variant="ghost" 
              content={description} 
              onDone={() => setEditingField(null)}
              onChange={(val) => onUpdate?.('description', val)} 
            />
          </div>
        ) : (
          <p 
            className={cn(
              "mx-auto mt-4 max-w-2xl text-lg text-brand-slate font-medium",
              isEditing && "hover:ring-1 hover:ring-cyan/30 cursor-edit transition-all rounded px-2 opacity-80"
            )}
            onClick={() => isEditing && setEditingField('description')}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        <div className="mt-12 flex flex-col items-center gap-4">
          {isEditing && editingField === 'button' ? (
            <div className="flex flex-col gap-2 p-6 bg-white/5 rounded-xl border border-white/10 w-full max-w-md">
               <Label className="text-white text-xs uppercase text-left mb-1 opacity-50">Button Text</Label>
               <Input 
                  value={buttonText} 
                  onChange={(e) => onUpdate?.('ctaButtonText', e.target.value)}
                  className="bg-navy text-white border-white/20 h-10 mb-2"
               />
               <Label className="text-white text-xs uppercase text-left mb-1 opacity-50">Button URL</Label>
               <Input 
                  value={buttonLink} 
                  onChange={(e) => onUpdate?.('ctaButtonLink', e.target.value)}
                  className="bg-navy text-white border-white/20 h-10"
               />
               <Button 
                onClick={() => setEditingField(null)}
                className="mt-4 bg-cyan text-navy font-bold hover:bg-white"
               >
                 DONE
               </Button>
            </div>
          ) : (
            <div className="relative group">
              <Link
                href={buttonLink}
                className={cn(
                    "inline-block rounded-sm bg-cyan px-10 py-4 text-sm font-bold text-navy uppercase tracking-widest transition-all hover:bg-white",
                    isEditing && "hover:ring-2 hover:ring-white border border-transparent shadow-lg"
                )}
                onClick={(e) => {
                    if (isEditing) {
                        e.preventDefault();
                        setEditingField('button');
                    }
                }}
              >
                {buttonText}
              </Link>
              {isEditing && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-cyan text-[10px] font-bold text-navy px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  CLICK TO EDIT BUTTON
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

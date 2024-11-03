import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";

const SocialMedia: React.FC<{
  control: UseFormReturn<any>["control"];
  errors: any;
}> = ({ control, errors }) => {
  return (
    <>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Instagram
        </label>
        <Controller
          name="instagram"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              type="text"
              {...field}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                errors.instagram ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Instagram URL"
            />
          )}
        />
        {errors.instagram && (
          <p className="text-red-500 mt-1">{errors.instagram.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Twitter
        </label>
        <Controller
          name="twitter"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              type="text"
              {...field}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                errors.twitter ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Twitter URL"
            />
          )}
        />
        {errors.twitter && (
          <p className="text-red-500 mt-1">{errors.twitter.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          LinkedIn
        </label>
        <Controller
          name="linkedin"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              type="text"
              {...field}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                errors.linkedin ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="LinkedIn URL"
            />
          )}
        />
        {errors.linkedin && (
          <p className="text-red-500 mt-1">{errors.linkedin.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Portfolio
        </label>
        <Controller
          name="portfolio"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              type="text"
              {...field}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                errors.portfolio ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Portfolio URL"
            />
          )}
        />
        {errors.portfolio && (
          <p className="text-red-500 mt-1">{errors.portfolio.message}</p>
        )}
      </div>
    </>
  );
};

export default SocialMedia;
